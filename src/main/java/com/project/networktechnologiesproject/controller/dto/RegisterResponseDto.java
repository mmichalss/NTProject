package com.project.networktechnologiesproject.controller.dto;

import com.project.networktechnologiesproject.commonTypes.UserRole;

public class RegisterResponseDto {
    private String username;
    private UserRole role;
    private long user_id;

    public RegisterResponseDto(String username, UserRole role, long userId) {
        this.username = username;
        this.role = role;
        user_id = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public long getUser_id() {
        return user_id;
    }

    public void setUser_id(long user_id) {
        this.user_id = user_id;
    }
}
