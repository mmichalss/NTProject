package com.project.networktechnologiesproject.service;

import com.project.networktechnologiesproject.controller.dto.*;
import com.project.networktechnologiesproject.infrastructure.entity.AuthEntity;
import com.project.networktechnologiesproject.infrastructure.entity.UserEntity;
import com.project.networktechnologiesproject.infrastructure.repository.AuthRepository;
import com.project.networktechnologiesproject.infrastructure.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.client.HttpClientErrorException;

public class AuthService {
    private final AuthRepository authRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    @Autowired
    public AuthService(AuthRepository authRepository, UserRepository userRepository, JwtService jwtService) {
        this.authRepository = authRepository;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    public RegisterResponseDto register(RegisterDto dto){
        UserEntity userEntity = new UserEntity();
        userEntity.setEmail(dto.getEmail());
        UserEntity createdUser = userRepository.save(userEntity);

        AuthEntity authEntity = new AuthEntity();
        authEntity.setPassword(dto.getPassword());
        authEntity.setUsername(dto.getUsername());
        authEntity.setRole(dto.getRole());
        authEntity.setUser(createdUser);

        AuthEntity createdAuth = authRepository.save(authEntity);

        return RegisterResponseDto(createdAuth.getUsername(), createdAuth.getRole());
    }
    public LoginResponseDto login(LoginDto dto){
        AuthEntity authEntity = authRepository.findByUsername(dto.getUsername()).orElseThrow(RuntimeException::new);

        if(!authEntity.getPassword().equals(dto.getPassword())){
            throw new RuntimeException();
        }

        String token =  jwtService.generateToken(authEntity);

        return new LoginResponseDto(token);
    }
}
