package com.ayyub.PersonalExpenseTracker.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.ayyub.PersonalExpenseTracker.dto.IncomeRequest;
import com.ayyub.PersonalExpenseTracker.entity.Income;
import com.ayyub.PersonalExpenseTracker.entity.User;
import com.ayyub.PersonalExpenseTracker.exception.IncomeNotFoundException;
import com.ayyub.PersonalExpenseTracker.exception.UserNotFoundException;
import com.ayyub.PersonalExpenseTracker.repository.CategoryRepository;
import com.ayyub.PersonalExpenseTracker.repository.IncomeRepository;
import com.ayyub.PersonalExpenseTracker.repository.UserRepository;
import com.ayyub.PersonalExpenseTracker.util.SecurityUtil;

@Service
public class IncomeService {
	
	private final IncomeRepository incomeRepository;
	private final UserRepository userRepository;
	private final CategoryRepository categoryRepository;
	private final SecurityUtil securityUtil;
	
	public IncomeService(IncomeRepository incomerpRepository,
			UserRepository userRepository,
			CategoryRepository categoryRepository,
			SecurityUtil securityUtil) {
		this.incomeRepository = incomerpRepository;
		this.userRepository = userRepository;
		this.categoryRepository = categoryRepository;
		this.securityUtil = securityUtil;
	}
	
	public Income createIncome(IncomeRequest request) {
		User user = securityUtil.getLoggedInUser();
		
		
		Income income = new Income();
		
		income.setTitle(request.getTitle());
		income.setAmount(request.getAmount());
		income.setDescription(request.getDescription());
		income.setDate(request.getDate());
		income.setUser(user);
		
		return incomeRepository.save(income);
	}
	
	public List<Income> getAllIncome(){
		
		User user = securityUtil.getLoggedInUser();
		return incomeRepository.findByUser(user);
	}
	
	public Income getIncomeById(Long id) {
		User user = securityUtil.getLoggedInUser();
		
		return incomeRepository
				.findByIdAndUser(id, user)
				.orElseThrow(() -> new IncomeNotFoundException("Income Not Found"));
	}
	
	public Income updateIncome(Long id, IncomeRequest request) {
		
		User loggedInUser = securityUtil.getLoggedInUser();
		Income income = incomeRepository
				.findByIdAndUser(id, loggedInUser)
				.orElseThrow(() -> new IncomeNotFoundException("Income Not Found"));
		
		income.setTitle(request.getTitle());
		income.setAmount(request.getAmount());
		income.setDescription(request.getDescription());
		income.setDate(request.getDate());
		income.setUser(loggedInUser);
		
		return incomeRepository.save(income);
				
	}
	
	public void deleteIncome(Long id) {
		
		User user = securityUtil.getLoggedInUser();
		Income income = incomeRepository
		.findByIdAndUser(id, user)
		.orElseThrow(() -> new IncomeNotFoundException("Income Not Found"));
		
		incomeRepository.delete(income);
	}
	
	public Page<Income> getIncome(int page,
			int size,
			String sortBy,
			String direction){
		User loggedInUser = securityUtil.getLoggedInUser();
		
		Sort sort = direction.equalsIgnoreCase("desc")
				? Sort.by(sortBy).descending()
						:Sort.by(sortBy).ascending();
		
		Pageable pageable = PageRequest.of(page, size, sort);
		
		return incomeRepository.findByUser(loggedInUser, pageable);
	}
	
	public Page<Income> searchIncome(String keyword,
			int page,
			int size) {
		User loggedInUser = securityUtil.getLoggedInUser();
		
		Pageable pageable = PageRequest.of(page, size);
		
		return incomeRepository.findByUserAndTitleContainingIgnoreCase(loggedInUser, keyword, pageable);
	}
	
	

}
