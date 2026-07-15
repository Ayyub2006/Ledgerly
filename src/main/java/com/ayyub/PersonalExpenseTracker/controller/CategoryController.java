package com.ayyub.PersonalExpenseTracker.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.ayyub.PersonalExpenseTracker.dto.CategoryRequest;
import com.ayyub.PersonalExpenseTracker.entity.Category;
import com.ayyub.PersonalExpenseTracker.service.CategoryService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/categories")
@Tag(
	    name = "Category Management",
	    description = "Manage expense categories"
	)
public class CategoryController {

	private final CategoryService categoryService;
	
	public CategoryController(CategoryService categoryService) {
		this.categoryService = categoryService;
	}
	
	@PostMapping
	@Operation(summary = "Create a new category")
	@ResponseStatus(HttpStatus.CREATED)
	public Category createCategory(@Valid @RequestBody CategoryRequest request) {
		return categoryService.createCategory(request);
	}
	
	@GetMapping
	@Operation(summary = "Get all category")
	public List<Category> getAllCategories(){
		return categoryService.getAllCategories();
	}
	
	@GetMapping("/{id}")
	public Category getCategoryById(@PathVariable Long id) {
		return categoryService.getCategoryById(id);
	}
	
	@PutMapping("/{id}")
	@Operation(summary = "Update category")
	public Category updateCategory(@PathVariable Long id,@Valid @RequestBody CategoryRequest request) {
	return categoryService.updateCategory(id, request);
	}
	
	@DeleteMapping("/{id}")
	@Operation(summary = "Delete category")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteCategory(@PathVariable Long id) {
		categoryService.deleteCategory(id);
	}
}
