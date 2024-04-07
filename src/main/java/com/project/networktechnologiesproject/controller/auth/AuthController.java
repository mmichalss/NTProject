package com.project.networktechnologiesproject.controller.auth;

import com.project.networktechnologiesproject.controller.auth.dto.LoginDto;
import com.project.networktechnologiesproject.controller.auth.dto.LoginResponseDto;
import com.project.networktechnologiesproject.controller.auth.dto.RegisterDto;
import com.project.networktechnologiesproject.controller.auth.dto.RegisterResponseDto;
import com.project.networktechnologiesproject.service.auth.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@PreAuthorize("hasRole('ADMIN')")
public class AuthController {
    private final AuthService authService;
    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponseDto> register(@RequestBody @Validated RegisterDto requestBody){
        RegisterResponseDto dto = authService.register(requestBody);
        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    @PreAuthorize("permitAll()")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginDto registerBody){
        LoginResponseDto dto = authService.login(registerBody);
        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }
}
