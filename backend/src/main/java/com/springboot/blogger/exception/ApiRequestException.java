package com.springboot.blogger.exception;

public class ApiRequestException extends RuntimeException {

    public ApiRequestException(String reason) {
        super(reason);
    }
}
