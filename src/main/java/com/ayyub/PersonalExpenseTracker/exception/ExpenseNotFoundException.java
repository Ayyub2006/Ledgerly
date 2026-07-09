package com.ayyub.PersonalExpenseTracker.exception;

public class ExpenseNotFoundException extends RuntimeException{
	
	
	public ExpenseNotFoundException(String message) {
		super(message);
	}
}
