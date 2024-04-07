package com.project.networktechnologiesproject.service.auth.error;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class UsernameOrPasswordNotValidException extends RuntimeException{
    private UsernameOrPasswordNotValidException(String message) {
        super(message);
    }

    public static ResponseStatusException create(){
        UsernameOrPasswordNotValidException exception = new UsernameOrPasswordNotValidException("Username or Password is not valid");
        return new ResponseStatusException(HttpStatus.UNAUTHORIZED, exception.getMessage(), exception);
    }
}
