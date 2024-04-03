package com.project.networktechnologiesproject.controller.dto;

import com.project.networktechnologiesproject.infrastructure.entity.BookEntity;
import com.project.networktechnologiesproject.infrastructure.entity.UserEntity;

import java.util.Date;

public class CreateLoanDto {
    private long userId;
    private long bookId;
    private Date dueDate;
    public CreateLoanDto() {
    }
    public CreateLoanDto(long user, long book, Date loanDate, Date dueDate) {
        this.userId = user;
        this.bookId = book;
        this.dueDate = dueDate;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public long getBookId() {
        return bookId;
    }

    public void setBookId(long bookId) {
        this.bookId = bookId;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

}
