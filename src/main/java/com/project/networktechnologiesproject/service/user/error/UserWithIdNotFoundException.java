package com.project.networktechnologiesproject.service.user.error;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class UserWithIdNotFoundException extends RuntimeException{
    private UserWithIdNotFoundException(String message) {
        super(message);
    }

    public static ResponseStatusException create(long id){
        UserWithIdNotFoundException exception = new UserWithIdNotFoundException(String.format("User with id: %s was not found", id));
        return new ResponseStatusException(HttpStatus.NOT_FOUND, exception.getMessage(), exception);
    }
}
