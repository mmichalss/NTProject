package com.project.networktechnologiesproject.service.user.error;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class UserWithUsernameNotFoundException extends RuntimeException{
    private UserWithUsernameNotFoundException(String message) {
        super(message);
    }

    public static ResponseStatusException create(String username){
        UserWithUsernameNotFoundException exception = new UserWithUsernameNotFoundException(String.format("User with username: %s was not found", username));
        return new ResponseStatusException(HttpStatus.NOT_FOUND, exception.getMessage(), exception);
    }
}
