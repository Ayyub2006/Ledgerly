package com.ayyub.PersonalExpenseTracker.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExpenseRequest {
	
	@NotBlank(message = "Title is required")
	private String title;
	
	@Positive(message = "Amount must be greater then 0")
	private Double amount;
	
	private String description;
	
	@NotNull(message = "Date is required")
	private LocalDate date;
	
	@NotNull(message = "User Id is required")
	private Long userId;
	
	@NotNull(message = "Category Id is required")
	private Long categoryId;
}
