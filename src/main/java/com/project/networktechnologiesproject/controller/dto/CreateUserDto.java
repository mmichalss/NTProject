package com.project.networktechnologiesproject.controller.dto;

import com.project.networktechnologiesproject.infrastructure.entity.LoanEntity;

import java.util.Set;

public class CreateUserDto {
    private String username;
    private String password;
    private String role;
    private String email;
    private String name;
    private Set<LoanEntity> loans;

    public CreateUserDto() {
    }

    public CreateUserDto(String username, String password, String role, String email, String name, Set<LoanEntity> loans) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.email = email;
        this.name = name;
        this.loans = loans;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
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

    public Set<LoanEntity> getLoans() {
        return loans;
    }

    public void setLoans(Set<LoanEntity> loans) {
        this.loans = loans;
    }
}
