package com.project.networktechnologiesproject.controller;

import com.project.networktechnologiesproject.infrastructure.entity.UserEntity;
import com.project.networktechnologiesproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    @GetMapping
    List<UserEntity> getAll(){
        return userService.getAll();
    }

    @GetMapping("/{id}")
    public UserEntity getOne(@PathVariable long id) {
        return userService.getOne(id);
    }

    @PostMapping
    public ResponseEntity<UserEntity> create(@RequestBody UserEntity user){
        var newUser = userService.create(user);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable long id){
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
