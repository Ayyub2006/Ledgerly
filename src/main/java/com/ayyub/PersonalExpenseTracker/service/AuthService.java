package com.ayyub.PersonalExpenseTracker.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ayyub.PersonalExpenseTracker.dto.LoginRequest;
import com.ayyub.PersonalExpenseTracker.dto.RegisterRequest;
import com.ayyub.PersonalExpenseTracker.entity.User;
import com.ayyub.PersonalExpenseTracker.exception.InvalidCredentialsException;
import com.ayyub.PersonalExpenseTracker.exception.UserAlreadyExistsException;
import com.ayyub.PersonalExpenseTracker.exception.UserNotFoundException;
import com.ayyub.PersonalExpenseTracker.repository.UserRepository;

@Service
public class AuthService {
	
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	
	public AuthService(UserRepository userRepository,
			PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}
	
	public User register(RegisterRequest request) {
		
		if(userRepository.existsByEmail(request.getEmail())) {
			throw new UserAlreadyExistsException("User Already Exists");
		}
		
		User user = new User();
		
		user.setName(request.getName());
		user.setEmail(request.getEmail());
		user.setPassword(passwordEncoder.encode(request.getPassword()));
		
		return userRepository.save(user);
		
	}
	
	public String login(LoginRequest request) {
		User user = userRepository
				.findByEmail(request.getEmail())
				.orElseThrow(() -> new UserNotFoundException("User not found"));
		
		if(!passwordEncoder
				.matches(request.getPassword(), user.getPassword())) {
			throw new InvalidCredentialsException("Invalid email or password");
		}
		
		return "Login Successful";
	}
}
