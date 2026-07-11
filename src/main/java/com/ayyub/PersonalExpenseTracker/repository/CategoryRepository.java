package com.ayyub.PersonalExpenseTracker.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ayyub.PersonalExpenseTracker.entity.Category;
import com.ayyub.PersonalExpenseTracker.entity.User;

public interface CategoryRepository extends JpaRepository<Category, Long>{
	
	
	List<Category> findByUser(User user);
	
	Optional<Category> findByIdAndUser(Long id, User user);
	
	boolean existsByNameAndUser(String name, User user);
	
	Long countByUser(User user);

}
