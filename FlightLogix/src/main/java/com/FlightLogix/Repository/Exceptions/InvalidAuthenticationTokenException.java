package com.FlightLogix.Repository.Exceptions;

public class InvalidAuthenticationTokenException extends RuntimeException{
    public InvalidAuthenticationTokenException(String message, Throwable cause) {
        super(message, cause);
    }
}
