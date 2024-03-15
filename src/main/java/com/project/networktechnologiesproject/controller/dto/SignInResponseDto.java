package com.project.networktechnologiesproject.controller.dto;

public class SignInResponseDto {
    private String token;
    public SignInResponseDto(String token){
        this.token = token;
    }

    public SignInResponseDto() {
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
