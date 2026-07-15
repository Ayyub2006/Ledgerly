package com.ayyub.PersonalExpenseTracker.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ayyub.PersonalExpenseTracker.dto.DashboardResponse;
import com.ayyub.PersonalExpenseTracker.service.DashboardService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/dashboard")
@Tag(
	    name = "Dashboard",
	    description = "Dashboard analytics"
	)
public class DashboardController {

	private final DashboardService dashboardService;
	
	public DashboardController(DashboardService dashboardService) {
		this.dashboardService = dashboardService;
	}
	
	@Operation(summary = "Get dashboard summary")
	@GetMapping
	public ResponseEntity<DashboardResponse> getDashboardSummary(){
		return ResponseEntity.ok(dashboardService.getDashboardSummary());
	}
}
