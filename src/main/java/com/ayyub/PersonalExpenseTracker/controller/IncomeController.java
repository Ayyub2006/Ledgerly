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

import com.ayyub.PersonalExpenseTracker.dto.IncomeRequest;
import com.ayyub.PersonalExpenseTracker.entity.Income;
import com.ayyub.PersonalExpenseTracker.service.IncomeService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/income")
@Tag(
	    name = "Income Management",
	    description = "Manage all income related APIs"
	)
public class IncomeController {
	
	private final IncomeService incomeService;
	
	public IncomeController(IncomeService incomeService) {
		this.incomeService = incomeService;
	}
	
	@PostMapping
	@Operation(summary = "Create a new income")
	@ResponseStatus(HttpStatus.CREATED)
	public Income createIncome(@Valid @RequestBody IncomeRequest request) {
		return incomeService.createIncome(request);
	}
	
	@GetMapping
	@Operation(summary = "Get all income")
	public List<Income> getALLIncomes(){
		return incomeService.getAllIncome();
	}
	
	@GetMapping("/{id}")
	public Income getIncomeById(@PathVariable Long id) {
		return incomeService.getIncomeById(id);
	}
	
	@PutMapping("/{id}")
	@Operation(summary = "Update income")
	public Income updateIncome(@PathVariable Long id, @Valid @RequestBody IncomeRequest request) {
		return incomeService.updateIncome(id, request);
	}
	
	@DeleteMapping("/{id}")
	@Operation(summary = "Delete income")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteIncome(@PathVariable Long id) {
		incomeService.deleteIncome(id);
	}
	
	
	@GetMapping("/page")
	public ResponseEntity<Page<Income>> getIncome(
			@RequestParam(defaultValue = "0") int page,
			
			@RequestParam(defaultValue = "5") int size,
			
			@RequestParam(defaultValue = "date") String sortBy,
			
			@RequestParam(defaultValue = "desc") String direction){
		
		return ResponseEntity.ok(incomeService.getIncome(page, size, sortBy, direction));	
	}
	
	@GetMapping("/search")
	public ResponseEntity<Page<Income>> searchIncome(
			@RequestParam String keyword,
			
			@RequestParam(defaultValue = "0") int page,
			
			@RequestParam(defaultValue = "5") int size){
		
		return ResponseEntity.ok(incomeService.searchIncome(keyword, page, size));
	}
}
