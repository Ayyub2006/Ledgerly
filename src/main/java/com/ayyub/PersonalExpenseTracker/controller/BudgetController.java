package com.ayyub.PersonalExpenseTracker.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ayyub.PersonalExpenseTracker.dto.BudgetRequest;
import com.ayyub.PersonalExpenseTracker.entity.Budget;
import com.ayyub.PersonalExpenseTracker.service.BudgetService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/budgets")
@Tag(
	    name = "Budget Management",
	    description = "Monthly budget APIs"
	)
public class BudgetController {

    private final BudgetService budgetService;

    public BudgetController(BudgetService budgetService) {
        this.budgetService = budgetService;
    }

    @Operation(summary = "Create or update monthly budget")
    @PostMapping
    public ResponseEntity<Budget> setBudget(
            @Valid @RequestBody BudgetRequest request) {

        return ResponseEntity.ok(
                budgetService.setBudget(request));
    }

    @Operation(summary = "Get current month budget")
    @GetMapping("/current")
    public ResponseEntity<Budget> getCurrentMonthBudget() {

        Budget budget = budgetService.getCurrentMonthBudget();

        if (budget == null) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(budget);
    }
}
