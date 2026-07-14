package com.ayyub.PersonalExpenseTracker.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ayyub.PersonalExpenseTracker.entity.Income;
import com.ayyub.PersonalExpenseTracker.entity.User;

public interface IncomeRepository extends JpaRepository<Income, Long>{
	
	List<Income> findByUser(User user);

	Optional<Income> findByIdAndUser(Long id, User user);
	
	@Query("SELECT COALESCE(SUM(i.amount), 0) FROM Income i WHERE i.user = :user")
	Double getTotalIncomeByUser(@Param("user") User user);
	
	Long countByUser(User user);
	
	Page<Income> findByUser(User user, Pageable pageble);
	
	Page<Income> findByUserAndTitleContainingIgnoreCase(
			User user,
			String keyword,
			Pageable pageable);

}
