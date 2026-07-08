package com.ayyub.PersonalExpenseTracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ayyub.PersonalExpenseTracker.entity.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, Long>{

}
