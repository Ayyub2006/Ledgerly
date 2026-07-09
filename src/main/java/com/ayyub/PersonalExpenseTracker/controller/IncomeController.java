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

import com.ayyub.PersonalExpenseTracker.dto.IncomeRequest;
import com.ayyub.PersonalExpenseTracker.entity.Income;
import com.ayyub.PersonalExpenseTracker.service.IncomeService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/income")
public class IncomeController {
	
	private final IncomeService incomeService;
	
	public IncomeController(IncomeService incomeService) {
		this.incomeService = incomeService;
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Income createIncome(@Valid @RequestBody IncomeRequest request) {
		return incomeService.createIncome(request);
	}
	
	@GetMapping
	public List<Income> getALLIncomes(){
		return incomeService.getAllIncome();
	}
	
	@GetMapping("/{id}")
	public Income getIncomeById(@PathVariable Long id) {
		return incomeService.getIncomeById(id);
	}
	
	@PutMapping("/{id}")
	public Income updateIncome(@PathVariable Long id, @Valid @RequestBody IncomeRequest request) {
		return incomeService.updateIncome(id, request);
	}
	
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteIncome(@PathVariable Long id) {
		incomeService.deleteIncome(id);
	}
}
