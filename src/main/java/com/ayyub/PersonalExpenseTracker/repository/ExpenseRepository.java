package com.ayyub.PersonalExpenseTracker.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ayyub.PersonalExpenseTracker.entity.User;
import com.ayyub.PersonalExpenseTracker.entity.Expense;


public interface ExpenseRepository extends JpaRepository<Expense, Long>{

	List<Expense> findByUser(User user);
	
	Optional<Expense> findByIdAndUser(Long id, User user);
	
	@Query("SELECT COALESCE(SUM(e.amount), 0) FROM Expense e WHERE e.user = :user")
	Double getTotalExpenseByUser(@Param("user") User user);
	
	Long countByUser(User user);
}
