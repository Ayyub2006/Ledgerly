package com.ayyub.PersonalExpenseTracker.service;

import org.springframework.stereotype.Service;

import com.ayyub.PersonalExpenseTracker.dto.DashboardResponse;
import com.ayyub.PersonalExpenseTracker.entity.User;
import com.ayyub.PersonalExpenseTracker.repository.CategoryRepository;
import com.ayyub.PersonalExpenseTracker.repository.ExpenseRepository;
import com.ayyub.PersonalExpenseTracker.repository.IncomeRepository;
import com.ayyub.PersonalExpenseTracker.util.SecurityUtil;

@Service
public class DashboardService {

	private final ExpenseRepository expenseRepository;
	private final IncomeRepository incomeRepository;
	private final CategoryRepository categoryRepository;
	private final SecurityUtil securityUtil;
	
	public DashboardService(ExpenseRepository expenseRepository,
			IncomeRepository incomeRepository,
			CategoryRepository categoryRepository,
			SecurityUtil securityUtil) {
		this.expenseRepository = expenseRepository;
		this.incomeRepository = incomeRepository;
		this.categoryRepository = categoryRepository;
		this.securityUtil = securityUtil;
	}
	
	public DashboardResponse getDashboardSummary() {
		
		User loggedInUser = securityUtil.getLoggedInUser();
		
		Double totalIncome = incomeRepository.getTotalIncomeByUser(loggedInUser);
		
		Double totalExpense = expenseRepository.getTotalExpenseByUser(loggedInUser);
		
		Long totalIncomeEntries = incomeRepository.countByUser(loggedInUser);
		
		Long totalExpenseEntries = expenseRepository.countByUser(loggedInUser);
		
		Long totalCategories = categoryRepository.countByUser(loggedInUser);
		
		Double remainingBalance = totalIncome - totalExpense;
		
		return DashboardResponse.builder()
				.totalIncome(totalIncome)
				.totalExpense(totalExpense)
				.remainingBalance(remainingBalance)
				.totalIncomeEntries(totalIncomeEntries)
				.totalExpenseEntries(totalExpenseEntries)
				.totalCategories(totalCategories)
				.build();
				
		
		
	}
}
