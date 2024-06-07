package com.project.networktechnologiesproject.controller.auth.dto;

import com.project.networktechnologiesproject.commonTypes.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.apache.catalina.User;

public class RegisterDto {
    @NotBlank(message = "Password is required")
    private String password;
    @NotBlank(message = "Username is required")
    private String username;
    @NotNull
    private UserRole role;
    @NotBlank(message = "Email is required")
    @Email
    private String email;

    public RegisterDto() {
    }

    public RegisterDto(String password, String username, UserRole role, String email) {
        this.password = password;
        this.username = username;
        this.role = role;
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
