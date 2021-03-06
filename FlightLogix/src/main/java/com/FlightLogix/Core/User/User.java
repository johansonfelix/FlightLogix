package com.FlightLogix.Core.User;


import com.FlightLogix.Core.Helpers.Helpers;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "user")

public class User implements Serializable {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    @Column(name = "userID")
    private String userID;

    @Column(name = "firstName")
    private String firstName;

    @Column(name = "lastName")
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name = "hashedPassword")
    private String hashedPassword;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private Role role;

    public User(String firstName,String lastName,String email, String password){

        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.hashedPassword = Helpers.stringToHash(password);

    }

    public User() {

    }

    @PrePersist
    public void ensureId() {
        userID = Helpers.randomNumber();
    }
    public String getId() {
        return userID;
    }

    public void setId(String id) {
        this.userID = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getHashedPassword() {
        return hashedPassword;
    }

    public void setHashedPassword(String hashedPassword) {
        this.hashedPassword = hashedPassword;
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = Role.CUSTOMER;
    }
}
