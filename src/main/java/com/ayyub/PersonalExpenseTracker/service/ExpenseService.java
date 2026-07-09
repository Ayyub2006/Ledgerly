package com.ayyub.PersonalExpenseTracker.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ayyub.PersonalExpenseTracker.dto.ExpenseRequest;
import com.ayyub.PersonalExpenseTracker.entity.Category;
import com.ayyub.PersonalExpenseTracker.entity.Expense;
import com.ayyub.PersonalExpenseTracker.entity.User;
import com.ayyub.PersonalExpenseTracker.exception.CategoryNotFoundException;
import com.ayyub.PersonalExpenseTracker.exception.ExpenseNotFoundException;
import com.ayyub.PersonalExpenseTracker.exception.UserNotFoundException;
import com.ayyub.PersonalExpenseTracker.repository.CategoryRepository;
import com.ayyub.PersonalExpenseTracker.repository.ExpenseRepository;
import com.ayyub.PersonalExpenseTracker.repository.UserRepository;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    public ExpenseService(ExpenseRepository expenseRepository,
                          UserRepository userRepository,
                          CategoryRepository categoryRepository) {
        this.expenseRepository = expenseRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
    }

    public Expense createExpense(ExpenseRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new CategoryNotFoundException("Category not found"));

        Expense expense = new Expense();

        expense.setTitle(request.getTitle());
        expense.setAmount(request.getAmount());
        expense.setDescription(request.getDescription());
        expense.setDate(request.getDate());
        expense.setUser(user);
        expense.setCategory(category);

        return expenseRepository.save(expense);
    }

    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    public Expense getExpenseById(Long id) {
        return expenseRepository
        		.findById(id)
        		.orElseThrow(() -> new ExpenseNotFoundException("Expense Not Found"));
        
    }

    public Expense updateExpense(Long id, ExpenseRequest request) {
        Expense expense = expenseRepository
        		.findById(id)
        		.orElseThrow(() -> new ExpenseNotFoundException("Expense Not Found"));
        
        User user = userRepository
        		.findById(request.getUserId())
        		.orElseThrow(() -> new UserNotFoundException("User Not Found"));
        
        Category category = categoryRepository
        		.findById(request.getCategoryId())
        		.orElseThrow(() -> new CategoryNotFoundException("Category Not Found"));
        
        expense.setTitle(request.getTitle());
        expense.setAmount(request.getAmount());
        expense.setCategory(category);
        expense.setDescription(request.getDescription());
        expense.setDate(request.getDate());
        expense.setUser(user);
        
        return expenseRepository.save(expense);
        
    }

    public void deleteExpense(Long id) {

    	Expense expense = expenseRepository
    			.findById(id)
    			.orElseThrow(() -> new ExpenseNotFoundException("Expense Not Found"));
    	
    	expenseRepository.delete(expense);
    }
}