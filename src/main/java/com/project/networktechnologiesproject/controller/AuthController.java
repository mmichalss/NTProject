package com.project.networktechnologiesproject.controller;

import com.project.networktechnologiesproject.controller.dto.LoginDto;
import com.project.networktechnologiesproject.controller.dto.LoginResponseDto;
import com.project.networktechnologiesproject.controller.dto.RegisterDto;
import com.project.networktechnologiesproject.controller.dto.RegisterResponseDto;
import com.project.networktechnologiesproject.infrastructure.entity.UserEntity;
import com.project.networktechnologiesproject.service.AuthService;
import com.project.networktechnologiesproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponseDto> register(@RequestBody RegisterDto requestBody){
        RegisterResponseDto dto = authService.register(requestBody);
        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginDto registerBody){
        LoginResponseDto dto = authService.login(registerBody);
        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }
}
