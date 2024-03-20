package com.project.networktechnologiesproject.controller.dto;

import com.project.networktechnologiesproject.infrastructure.entity.AuthEntity;
import com.project.networktechnologiesproject.infrastructure.entity.LoanEntity;
import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;

import java.util.Set;

public class GetUserDto {
    private long id;
    private String email;
    private String name;
    private AuthEntity auth;
    private Set<LoanEntity> loans;

    public GetUserDto() {
    }

    public GetUserDto(long id, String email, String name, Set<LoanEntity> loans,  AuthEntity auth) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.auth = auth;
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
