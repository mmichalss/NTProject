package com.project.networktechnologiesproject.controller.dto;

import com.project.networktechnologiesproject.infrastructure.entity.AuthEntity;
import com.project.networktechnologiesproject.infrastructure.entity.LoanEntity;

import java.util.Set;

public class CreateUserDto {
    private String email;
    private String name;
    private AuthEntity auth;
    private Set<LoanEntity> loans;

    public CreateUserDto() {
    }

    public CreateUserDto(String email, String name, AuthEntity auth, Set<LoanEntity> loans) {
        this.email = email;
        this.name = name;
        this.auth = auth;
        this.loans = loans;
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

    public AuthEntity getAuth() {
        return auth;
    }

    public void setAuth(AuthEntity auth) {
        this.auth = auth;
    }

    public Set<LoanEntity> getLoans() {
        return loans;
    }

    public void setLoans(Set<LoanEntity> loans) {
        this.loans = loans;
    }
}
