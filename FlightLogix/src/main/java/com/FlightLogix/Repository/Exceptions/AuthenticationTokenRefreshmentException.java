package com.FlightLogix.Repository.Exceptions;

public class AuthenticationTokenRefreshmentException extends Exception {

    public AuthenticationTokenRefreshmentException(String message) {
        super(message);
    }

    public AuthenticationTokenRefreshmentException(String message, Throwable cause) {
        super(message, cause);
    }
}
