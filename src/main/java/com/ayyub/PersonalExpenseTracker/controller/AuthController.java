package com.ayyub.PersonalExpenseTracker.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.ayyub.PersonalExpenseTracker.dto.LoginRequest;
import com.ayyub.PersonalExpenseTracker.dto.RegisterRequest;
import com.ayyub.PersonalExpenseTracker.entity.User;
import com.ayyub.PersonalExpenseTracker.service.AuthService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(
	    name = "Authentication",
	    description = "User Registration and Login APIs"
	)
	@RestController
	@RequestMapping("/api/auth")

	public class AuthController {
	
	private final AuthService authService;
	
	public AuthController(AuthService authService) {
		this.authService = authService;
	}
	
	@Operation(summary = "Register a new user")
	@PostMapping("/register")
	@ResponseStatus(HttpStatus.CREATED)
	public User register(@Valid @RequestBody RegisterRequest request) {
		return authService.register(request);
	}
	
	@Operation(summary = "Login user and generate JWT token")
	@PostMapping("/login")
	public String login(@Valid @RequestBody LoginRequest request) {
		return authService.login(request);
	}
}
