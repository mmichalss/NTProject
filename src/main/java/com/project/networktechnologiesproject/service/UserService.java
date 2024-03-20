package com.project.networktechnologiesproject.service;

import com.project.networktechnologiesproject.controller.dto.*;
import com.project.networktechnologiesproject.infrastructure.entity.BookEntity;
import com.project.networktechnologiesproject.infrastructure.entity.UserEntity;
import com.project.networktechnologiesproject.infrastructure.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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
    public List<GetUserDto> getAll(){
        var users = userRepository.findAll();
        return users.stream().map((user) -> new GetUserDto(user.getId(), user.getEmail(), user.getName(), user.getLoans(), user.getAuth())).collect(Collectors.toList());
    }
    public GetUserDto getOne(long id){
        // this function is optional, so .orElseThrow() is needed.
        var user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        return new GetUserDto(user.getId(), user.getEmail(), user.getName(), user.getLoans(), user.getAuth());
    }
    public CreateUserResponseDto create(CreateUserDto user){
        // After creating UserDto I should encrypt the password attribute.
        // UserEntity.setPassword(passwordEncoder.encode(user.getPassword()));
        var userEntity = new UserEntity();
        userEntity.setEmail(user.getEmail());
        userEntity.setName(user.getName());
        userEntity.setLoans(user.getLoans());
        userEntity.setAuth(user.getAuth());
        var newUser = userRepository.save(userEntity);

        return new CreateUserResponseDto(newUser.getId(), newUser.getEmail(), newUser.getName(), newUser.getLoans(), newUser.getAuth());

    }

    /*public SignInResponseDto signIn(SignInDto signInDto){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signInDto.getUsername(), signInDto.getPassword()));
        UserEntity user = userRepository.findByUsername(signInDto.getUsername()).orElseThrow();
        var token = jwtService.generateToken(user);
        return new SignInResponseDto(token);
    }*/

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
