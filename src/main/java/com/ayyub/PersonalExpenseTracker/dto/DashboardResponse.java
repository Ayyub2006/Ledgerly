package com.ayyub.PersonalExpenseTracker.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DashboardResponse {

	private Double totalIncome;
	private Double totalExpense;
	private Double remainingBalance;
	private Long totalIncomeEntries;
	private Long totalExpenseEntries;
	private Long totalCategories;
}
