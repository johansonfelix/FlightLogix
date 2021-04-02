package com.example.Core;

public class Customer extends User{
    public Customer(String id, String firstName, String lastName, String email, String hashedPassword) {
        super(id, firstName, lastName, email, hashedPassword);
    }
}
