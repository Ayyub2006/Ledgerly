package com.ayyub.PersonalExpenseTracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ayyub.PersonalExpenseTracker.entity.Income;

public interface IncomeRepository extends JpaRepository<Income, Long>{
	

}
