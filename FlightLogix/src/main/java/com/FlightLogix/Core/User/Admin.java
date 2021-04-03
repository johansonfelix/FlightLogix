package com.FlightLogix.Core.User;

public class Admin extends User {
    public Admin(String id, String firstName, String lastName, String email, String hashedPassword) {
        super(firstName, lastName, email, hashedPassword);
    }
}
