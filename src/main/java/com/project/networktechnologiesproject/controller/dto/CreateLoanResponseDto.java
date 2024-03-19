package com.project.networktechnologiesproject.controller.dto;

import com.project.networktechnologiesproject.infrastructure.entity.BookEntity;
import com.project.networktechnologiesproject.infrastructure.entity.UserEntity;

import java.util.Date;

public class CreateLoanResponseDto {
    private long id;
    private UserEntity user;
    private BookEntity book;
    private Date loanDate;
    private Date dueDate;
    private Date return_date;

    public CreateLoanResponseDto() {
    }

    public CreateLoanResponseDto(long id, UserEntity user, BookEntity book, Date loanDate, Date dueDate, Date return_date) {
        this.id = id;
        this.user = user;
        this.book = book;
        this.loanDate = loanDate;
        this.dueDate = dueDate;
        this.return_date = return_date;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public BookEntity getBook() {
        return book;
    }

    public void setBook(BookEntity book) {
        this.book = book;
    }

    public Date getLoanDate() {
        return loanDate;
    }

    public void setLoanDate(Date loanDate) {
        this.loanDate = loanDate;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public Date getReturn_date() {
        return return_date;
    }

    public void setReturn_date(Date return_date) {
        this.return_date = return_date;
    }
}
