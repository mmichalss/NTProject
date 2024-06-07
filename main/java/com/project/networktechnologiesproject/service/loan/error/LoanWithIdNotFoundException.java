package com.project.networktechnologiesproject.service.loan.error;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class LoanWithIdNotFoundException extends RuntimeException{
    private LoanWithIdNotFoundException(String message) {
        super(message);
    }

    public static ResponseStatusException create(long id){
        LoanWithIdNotFoundException exception = new LoanWithIdNotFoundException(String.format("Loan with id: %s was not found", id));
        return new ResponseStatusException(HttpStatus.NOT_FOUND, exception.getMessage(), exception);
    }
}
