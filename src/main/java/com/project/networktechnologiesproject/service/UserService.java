package com.project.networktechnologiesproject.service;

import com.project.networktechnologiesproject.infrastructure.entity.BookEntity;
import com.project.networktechnologiesproject.infrastructure.entity.UserEntity;
import com.project.networktechnologiesproject.infrastructure.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }
    public List<UserEntity> getAll(){
        return userRepository.findAll();
    }
    public UserEntity getOne(long id){
        // this function is optional, so .orElseThrow() is needed.
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }
    public UserEntity create(UserEntity user){
        return userRepository.save(user);
    }
    public void delete(long id){
        if (!userRepository.existsById(id)){
            throw new RuntimeException();
        }
        userRepository.deleteById(id);
    }
}
