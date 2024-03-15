package com.project.networktechnologiesproject.controller;

import com.project.networktechnologiesproject.infrastructure.entity.UserEntity;
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
    private final UserService userService;

    @Autowired
    public AuthController(UserService userService){
        this.userService = userService;
    }

    @PostMapping("/singIn")
    public ResponseEntity<> signIn(){

    }

    @PostMapping("/signUp")
    public ResponseEntity<UserEntity> signUp(@RequestBody UserEntity user){
            var newUser = userService.create(user);
            return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }
}
