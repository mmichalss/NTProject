package com.project.networktechnologiesproject.service.loan.error;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class NoAvailableCopiesOfBookException extends RuntimeException{
    private NoAvailableCopiesOfBookException(String message) {
        super(message);
    }

    public static ResponseStatusException create(long id){
        NoAvailableCopiesOfBookException exception = new NoAvailableCopiesOfBookException(String.format("Book with id: %s is not available", id));
        return new ResponseStatusException(HttpStatus.NOT_FOUND, exception.getMessage(), exception);
    }
}
