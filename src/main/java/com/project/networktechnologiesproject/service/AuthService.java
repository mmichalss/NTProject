package com.project.networktechnologiesproject.service;

import com.project.networktechnologiesproject.controller.dto.*;
import com.project.networktechnologiesproject.infrastructure.entity.AuthEntity;
import com.project.networktechnologiesproject.infrastructure.entity.UserEntity;
import com.project.networktechnologiesproject.infrastructure.repository.AuthRepository;
import com.project.networktechnologiesproject.infrastructure.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class AuthService {
    private final AuthRepository authRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthService(AuthRepository authRepository, UserRepository userRepository, JwtService jwtService, PasswordEncoder passwordEncoder) {
        this.authRepository = authRepository;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }
    @Transactional
    public RegisterResponseDto register(RegisterDto dto){
        Optional<AuthEntity> existingAuth = authRepository.findByUsername(dto.getUsername());

        if (existingAuth.isPresent()){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User already exists: " + dto.getUsername());
        }

        UserEntity userEntity = new UserEntity();
        userEntity.setEmail(dto.getEmail());
        userRepository.save(userEntity);

        AuthEntity authEntity = new AuthEntity();
        String hashPassword = passwordEncoder.encode(dto.getPassword());
        authEntity.setPassword(hashPassword);
        authEntity.setUsername(dto.getUsername());
        authEntity.setRole(dto.getRole());
        authEntity.setUser(userEntity);

        authRepository.save(authEntity);

        return new RegisterResponseDto(authEntity.getUsername(), authEntity.getRole(), userEntity.getId());
    }
    public LoginResponseDto login(LoginDto dto){
        AuthEntity authEntity = authRepository.findByUsername(dto.getUsername()).orElseThrow(RuntimeException::new);

        if(!passwordEncoder.matches(dto.getPassword(), authEntity.getPassword())){
            throw new RuntimeException();
        }

        String token =  jwtService.generateToken(authEntity);

        return new LoginResponseDto(token);
    }
}
