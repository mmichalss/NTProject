package com.project.networktechnologiesproject.service;

import com.project.networktechnologiesproject.controller.dto.SignInDto;
import com.project.networktechnologiesproject.controller.dto.SignInResponseDto;
import com.project.networktechnologiesproject.infrastructure.entity.UserEntity;
import com.project.networktechnologiesproject.infrastructure.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtService jwtService){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }
    public List<UserEntity> getAll(){
        return userRepository.findAll();
    }
    public UserEntity getOne(long id){
        // this function is optional, so .orElseThrow() is needed.
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }
    public UserEntity create(UserEntity user){
        // After creating UserDto I should encrypt the password attribute.
        // UserEntity.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public SignInResponseDto signIn(SignInDto signInDto){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signInDto.getUsername(), signInDto.getPassword()));
        UserEntity user = userRepository.findByUsername(signInDto.getUsername()).orElseThrow();
        var token = jwtService.generateToken(user);
        return new SignInResponseDto(token);
    }

    public void delete(long id){
        if (!userRepository.existsById(id)){
            throw new RuntimeException();
        }
        userRepository.deleteById(id);
    }
    public UserEntity getOneByUsername(String username){
        return userRepository.findByUsername(username).orElseThrow();
    }
}
