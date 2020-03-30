package com.springboot.blogger.dto;

public class MessageDto {

    public MessageDto(String message) {
        this.message = message;
    }

    private String message;

    public String getMessage() {
        return message;
    }
}
