package com.example.sd_assignment1.controllers;

import com.example.sd_assignment1.dtos.request.AddUserDTO;
import com.example.sd_assignment1.dtos.request.LoginRequestDTO;
import com.example.sd_assignment1.services.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequestDTO loginRequest) {
        return this.authService.validateLogin(loginRequest);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody AddUserDTO addUserDTO) {
        return this.authService.signUp(addUserDTO);
    }

    @GetMapping("/signout")
    public ResponseEntity<?> logoutUser() {
        return ResponseEntity.ok("");
    }
}