package com.ayyub.PersonalExpenseTracker.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ayyub.PersonalExpenseTracker.dto.CategoryRequest;
import com.ayyub.PersonalExpenseTracker.entity.Category;
import com.ayyub.PersonalExpenseTracker.entity.User;
import com.ayyub.PersonalExpenseTracker.exception.CategoryAlreadyExistsException;
import com.ayyub.PersonalExpenseTracker.exception.CategoryNotFoundException;
import com.ayyub.PersonalExpenseTracker.repository.CategoryRepository;
import com.ayyub.PersonalExpenseTracker.util.SecurityUtil;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final SecurityUtil securityUtil;

    public CategoryService(CategoryRepository categoryRepository,
    		SecurityUtil securityUtil) {
        this.categoryRepository = categoryRepository;
        this.securityUtil = securityUtil;
    }

    public Category createCategory(CategoryRequest request) {
    	
    	User loggedInUser = securityUtil.getLoggedInUser();
    	
        if (categoryRepository.existsByNameAndUser(request.getName(), loggedInUser)) {
            throw new CategoryAlreadyExistsException("Category already exists");
        }

        Category category = new Category();
        category.setName(request.getName());
        category.setUser(loggedInUser);
        return categoryRepository.save(category);
    }

    public List<Category> getAllCategories() {
    	
    	User loggedInUser = securityUtil.getLoggedInUser();
    	
        return categoryRepository.findByUser(loggedInUser);
    }

    public Category getCategoryById(Long id) {
    	
    	User loggedInUser = securityUtil.getLoggedInUser();
    	
        return categoryRepository.findByIdAndUser(id, loggedInUser)
                .orElseThrow(() -> new CategoryNotFoundException("Category not found"));
    }

    public Category updateCategory(Long id, CategoryRequest request) {

    	User loggedInUser = securityUtil.getLoggedInUser();
    	
        Category category = categoryRepository.findByIdAndUser(id, loggedInUser)
                .orElseThrow(() -> new CategoryNotFoundException("Category not found"));
        	
        if(categoryRepository.existsByNameAndUser(request.getName(), loggedInUser)
        		&& !category.getName().equalsIgnoreCase(request.getName())) {
        	
        	throw new CategoryAlreadyExistsException("Category Already Exists");
        }
        category.setName(request.getName());
        category.setUser(loggedInUser);
        return categoryRepository.save(category);
    }

    public void deleteCategory(Long id) {
    	
    	User loggedInUser = securityUtil.getLoggedInUser();
    	
        Category category = categoryRepository
        		.findByIdAndUser(id, loggedInUser)
                .orElseThrow(() -> new CategoryNotFoundException("Category not found"));

        categoryRepository.delete(category);
    }

}