package com.ayyub.PersonalExpenseTracker.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.ayyub.PersonalExpenseTracker.dto.ExpenseRequest;
import com.ayyub.PersonalExpenseTracker.entity.Expense;
import com.ayyub.PersonalExpenseTracker.service.ExpenseService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/expenses")
@Tag(
	    name = "Expense Management",
	    description = "Manage all expense related APIs"
	)
public class ExpenseController {
	
	private final ExpenseService expenseService;
	
	public ExpenseController(ExpenseService expenseService) {
		this.expenseService = expenseService;
	}
	
	@PostMapping
	@Operation(summary = "Create a new expense")
	@ResponseStatus(HttpStatus.CREATED)
	public Expense createExpese(@Valid @RequestBody ExpenseRequest request) {
		return expenseService.createExpense(request);
	}
	
	@GetMapping
	@Operation(summary = "Get all expenses")
	public List<Expense> getAllExpenses(){
		return expenseService.getAllExpenses();
	}
	
	@GetMapping("/{id}")
	public Expense getExpeseById(@PathVariable Long id) {
		return expenseService.getExpenseById(id);
	}
	
	@PutMapping("/{id}")
	@Operation(summary = "Update expense")
	public Expense updateExpese(@PathVariable Long id, @Valid @RequestBody ExpenseRequest request) {
		return expenseService.updateExpense(id, request);
	}
	
	@DeleteMapping("/{id}")
	@Operation(summary = "Delete expense")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteExpense(@PathVariable Long id) {
		expenseService.deleteExpense(id);
	}
	
	@GetMapping("/page")
	public ResponseEntity<Page<Expense>> getExpenses(
		
		@RequestParam(defaultValue = "0") int page,
		@RequestParam(defaultValue = "5") int size,
		@RequestParam(defaultValue = "date") String sortBy,
		@RequestParam(defaultValue = "desc") String direction){
		return ResponseEntity.ok(expenseService.getExpenses(page, size, sortBy, direction));
	}
	
	@GetMapping("/search")
	public ResponseEntity<Page<Expense>> searchExpenses(
			@RequestParam String keyword,
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "5") int size){
		
		return ResponseEntity.ok(expenseService.searchExpense(keyword, page, size));
		
	}
	
	@GetMapping("/category/{categoryId}")
	public ResponseEntity<Page<Expense>> getExpensesByCategory(

	        @PathVariable Long categoryId,

	        @RequestParam(defaultValue = "0") int page,

	        @RequestParam(defaultValue = "5") int size) {

	    return ResponseEntity.ok(
	            expenseService.getExpenseByCategory(categoryId, page, size));
	}
	

}
