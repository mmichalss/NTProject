package com.project.networktechnologiesproject.service.auth;

import com.project.networktechnologiesproject.controller.auth.dto.LoginDto;
import com.project.networktechnologiesproject.controller.auth.dto.LoginResponseDto;
import com.project.networktechnologiesproject.controller.auth.dto.RegisterDto;
import com.project.networktechnologiesproject.controller.auth.dto.RegisterResponseDto;
import com.project.networktechnologiesproject.infrastructure.auth.AuthEntity;
import com.project.networktechnologiesproject.infrastructure.user.UserEntity;
import com.project.networktechnologiesproject.infrastructure.auth.AuthRepository;
import com.project.networktechnologiesproject.infrastructure.user.UserRepository;
import com.project.networktechnologiesproject.service.auth.error.UserAlreadyExistsException;
import com.project.networktechnologiesproject.service.auth.error.UsernameOrPasswordNotValidException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
            throw UserAlreadyExistsException.create(dto.getUsername());
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
            throw UsernameOrPasswordNotValidException.create();
        }

        String token =  jwtService.generateToken(authEntity);

        return new LoginResponseDto(token);
    }
}
