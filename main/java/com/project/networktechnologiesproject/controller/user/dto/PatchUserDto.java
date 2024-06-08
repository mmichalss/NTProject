package com.project.networktechnologiesproject.controller.user.dto;

import org.openapitools.jackson.nullable.JsonNullable;

public class PatchUserDto {
    private JsonNullable<String> name;
    private JsonNullable<String> lastName;
    private JsonNullable<String> email;

    public PatchUserDto(JsonNullable<String> name, JsonNullable<String> lastName, JsonNullable<String> email) {
        this.name = name;
        this.lastName = lastName;
        this.email = email;
    }

    public JsonNullable<String> getName() {
        return name;
    }

    public void setName(JsonNullable<String> name) {
        this.name = name;
    }

    public JsonNullable<String> getLastName() {
        return lastName;
    }

    public void setLastName(JsonNullable<String> lastName) {
        this.lastName = lastName;
    }

    public JsonNullable<String> getEmail() {
        return email;
    }

    public void setEmail(JsonNullable<String> email) {
        this.email = email;
    }
}
