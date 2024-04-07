package com.project.networktechnologiesproject.controller.loan.dto;

import java.sql.Date;
import jakarta.validation.constraints.NotNull;

public class CreateLoanDto {
    @NotNull
    private Long userId;

    @NotNull
    private Long bookId;

    @NotNull
    private Date dueDate;
    public CreateLoanDto() {
    }
    public CreateLoanDto(Long user, Long book, Date dueDate) {
        this.userId = user;
        this.bookId = book;
        this.dueDate = dueDate;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getBookId() {
        return bookId;
    }

    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

}
