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

import com.ayyub.PersonalExpenseTracker.dto.ExpenseRequest;
import com.ayyub.PersonalExpenseTracker.entity.Expense;
import com.ayyub.PersonalExpenseTracker.service.ExpenseService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {
	
	private final ExpenseService expenseService;
	
	public ExpenseController(ExpenseService expenseService) {
		this.expenseService = expenseService;
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Expense createExpese(@Valid @RequestBody ExpenseRequest request) {
		return expenseService.createExpense(request);
	}
	
	@GetMapping
	public List<Expense> getAllExpenses(){
		return expenseService.getAllExpenses();
	}
	
	@GetMapping("/{id}")
	public Expense getExpeseById(@PathVariable Long id) {
		return expenseService.getExpenseById(id);
	}
	
	@PutMapping("/{id}")
	public Expense updateExpese(@PathVariable Long id, @Valid @RequestBody ExpenseRequest request) {
		return expenseService.updateExpense(id, request);
	}
	
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteExpense(@PathVariable Long id) {
		expenseService.deleteExpense(id);
	}
	
}
