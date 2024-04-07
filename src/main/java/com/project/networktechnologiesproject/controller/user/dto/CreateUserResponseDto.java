package com.project.networktechnologiesproject.controller.user.dto;

import com.project.networktechnologiesproject.infrastructure.loan.LoanEntity;

import java.util.List;

public class CreateUserResponseDto {
    private long id;
    private String email;
    private String name;
    private List<LoanEntity> loans;

    public CreateUserResponseDto() {
    }

    public CreateUserResponseDto(long id, String email, String name, List<LoanEntity> loans) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.loans = loans;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<LoanEntity> getLoans() {
        return loans;
    }

    public void setLoans(List<LoanEntity> loans) {
        this.loans = loans;
    }
}
