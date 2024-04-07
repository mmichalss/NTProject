package com.project.networktechnologiesproject.service.book.error;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class BookWithIdNotFoundException extends RuntimeException{
    private BookWithIdNotFoundException(String message) {
        super(message);
    }

    public static ResponseStatusException create(long id){
        BookWithIdNotFoundException exception = new BookWithIdNotFoundException(String.format("Book with id: %s was not found", id));
        return new ResponseStatusException(HttpStatus.NOT_FOUND, exception.getMessage(), exception);
    }
}
