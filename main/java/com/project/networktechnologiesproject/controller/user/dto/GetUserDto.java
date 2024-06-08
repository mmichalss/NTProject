package com.project.networktechnologiesproject.controller.user.dto;

import com.project.networktechnologiesproject.infrastructure.loan.LoanEntity;

import java.util.List;

public class GetUserDto {
    private long id;
    private String email;
    private String name;
    private String lastName;

    public GetUserDto() {
    }

    public GetUserDto(long id, String email, String name, String lastName) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.lastName = lastName;
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

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}
