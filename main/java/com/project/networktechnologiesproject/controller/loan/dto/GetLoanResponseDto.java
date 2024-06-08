package com.project.networktechnologiesproject.controller.loan.dto;

import com.project.networktechnologiesproject.controller.book.dto.GetBookDto;
import com.project.networktechnologiesproject.controller.user.dto.GetUserDto;

import java.sql.Date;


public class GetLoanResponseDto {
    private long id;
    private GetUserDto user;
    private GetBookDto book;
    private Date loanDate;
    private Date dueDate;

    public GetLoanResponseDto(long id, GetUserDto user, GetBookDto book, Date loanDate, Date dueDate) {
        this.id = id;
        this.user = user;
        this.book = book;
        this.loanDate = loanDate;
        this.dueDate = dueDate;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public GetUserDto getUser() {
        return user;
    }

    public void setUser(GetUserDto user) {
        this.user = user;
    }

    public GetBookDto getBook() {
        return book;
    }

    public void setBook(GetBookDto book) {
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
}
