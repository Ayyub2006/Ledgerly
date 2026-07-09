package com.ayyub.PersonalExpenseTracker.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ayyub.PersonalExpenseTracker.dto.IncomeRequest;
import com.ayyub.PersonalExpenseTracker.entity.Income;
import com.ayyub.PersonalExpenseTracker.entity.User;
import com.ayyub.PersonalExpenseTracker.exception.IncomeNotFoundException;
import com.ayyub.PersonalExpenseTracker.exception.UserNotFoundException;
import com.ayyub.PersonalExpenseTracker.repository.CategoryRepository;
import com.ayyub.PersonalExpenseTracker.repository.IncomeRepository;
import com.ayyub.PersonalExpenseTracker.repository.UserRepository;

@Service
public class IncomeService {
	
	private final IncomeRepository incomeRepository;
	private final UserRepository userRepository;
	private final CategoryRepository categoryRepository;
	
	public IncomeService(IncomeRepository incomerpRepository,
			UserRepository userRepository,
			CategoryRepository categoryRepository) {
		this.incomeRepository = incomerpRepository;
		this.userRepository = userRepository;
		this.categoryRepository = categoryRepository;
	}
	
	public Income createIncome(IncomeRequest request) {
		User user = userRepository.findById(request.getUserId())
				.orElseThrow(() -> new UserNotFoundException("User Not Found"));
		
//		Category category = categoryRepository.findById(request.getCategoryId())
//				.orElseThrow(() -> new CategoryNotFoundException("Category Not Found"));
		
		Income income = new Income();
		
		income.setTitle(request.getTitle());
		income.setAmount(request.getAmount());
		income.setDescription(request.getDescription());
		income.setDate(request.getDate());
		income.setUser(user);
		
		return incomeRepository.save(income);
	}
	
	public List<Income> getAllIncome(){
		return incomeRepository.findAll();
	}
	
	public Income getIncomeById(Long id) {
		return incomeRepository
				.findById(id)
				.orElseThrow(() -> new IncomeNotFoundException("Income Not Found"));
	}
	
	public Income updateIncome(Long id, IncomeRequest request) {
		Income income = incomeRepository
				.findById(id)
				.orElseThrow(() -> new IncomeNotFoundException("Income Not Found"));
		
		User user = userRepository
				.findById(request.getUserId())
				.orElseThrow(() -> new UserNotFoundException("User Not Found"));
		
		income.setTitle(request.getTitle());
		income.setAmount(request.getAmount());
		income.setDescription(request.getDescription());
		income.setDate(request.getDate());
		income.setUser(user);
		
		return incomeRepository.save(income);
				
	}
	
	public void deleteIncome(Long id) {
		Income income = incomeRepository
		.findById(id)
		.orElseThrow(() -> new IncomeNotFoundException("Income Not Found"));
		
		incomeRepository.delete(income);
	}
}
