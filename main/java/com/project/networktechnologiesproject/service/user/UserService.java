package com.project.networktechnologiesproject.service.user;

import com.project.networktechnologiesproject.controller.user.dto.*;
import com.project.networktechnologiesproject.infrastructure.auth.AuthEntity;
import com.project.networktechnologiesproject.infrastructure.user.UserEntity;
import com.project.networktechnologiesproject.infrastructure.auth.AuthRepository;
import com.project.networktechnologiesproject.infrastructure.user.UserRepository;
import com.project.networktechnologiesproject.service.auth.OwnershipService;
import com.project.networktechnologiesproject.service.user.error.UserWithIdNotFoundException;
import com.project.networktechnologiesproject.service.user.error.UserWithUsernameNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService extends OwnershipService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository, AuthRepository authRepository){
        super(authRepository);
        this.userRepository = userRepository;
    }
    public List<GetUserDto> getAll(){
        var users = userRepository.findAll();
        return users.stream().map((user) -> new GetUserDto(user.getId(), user.getEmail(), user.getName(), user.getLastName())).collect(Collectors.toList());
    }
    public GetUserDto getOne(long id){
        // this function is optional, so .orElseThrow() is needed.
        var user = userRepository.findById(id).orElseThrow(() -> UserWithIdNotFoundException.create(id));
        return new GetUserDto(user.getId(), user.getEmail(), user.getName(), user.getLastName());
    }
    public CreateUserResponseDto create(CreateUserDto user){
        // After creating UserDto I should encrypt the password attribute.
        // UserEntity.setPassword(passwordEncoder.encode(user.getPassword()));3
        var userEntity = new UserEntity();
        userEntity.setEmail(user.getEmail());
        userEntity.setName(user.getName());
        userEntity.setLoans(user.getLoans());
        var newUser = userRepository.save(userEntity);

        return new CreateUserResponseDto(newUser.getId(), newUser.getEmail(), newUser.getName(), newUser.getLoans());

    }

    @Transactional
    public void delete(long id){
        if (!userRepository.existsById(id)){
            throw UserWithIdNotFoundException.create(id);
        }
        authRepository.deleteByUser_Id(id);
        userRepository.deleteById(id);
    }

    public GetUserDto getUserByUsername(String username){
        AuthEntity auth = authRepository.findByUsername(username).orElseThrow(() -> UserWithUsernameNotFoundException.create(username));
        UserEntity user = auth.getUser();

        return new GetUserDto(user.getId(), user.getEmail(), user.getName(), user.getLastName());
    }

    @PreAuthorize("hasRole('ADMIN') or isAuthenticated() and this.isOwner(authentication.name, #id)")
    public PatchUserResponseDto update(long id, PatchUserDto dto){
        UserEntity user = userRepository.findById(id).orElseThrow();

        // dto.getEmail() can be null, present and not present (undefined).
        dto.getEmail().ifPresent(user::setEmail);
        dto.getName().ifPresent(user::setName);
        dto.getLastName().ifPresent(user::setLastName);

        userRepository.save(user);

        return new PatchUserResponseDto(user.getId(), user.getName(), user.getLastName(), user.getEmail());
    }
}
