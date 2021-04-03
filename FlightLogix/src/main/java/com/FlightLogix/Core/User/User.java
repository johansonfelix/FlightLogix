package com.FlightLogix.Core.User;


import com.FlightLogix.Helpers.Helpers;

import javax.persistence.*;
import java.io.Serializable;



@Entity
@Table(name = "user")
@NamedQuery(name="User.findAll", query="SELECT e from User e")
@NamedQuery(name="User.findUser", query="SELECT e from User e WHERE e.userID = :userID")
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


    public User(String userID,String firstName,String lastName,String email, String hashedPassword){
        this.userID = userID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.hashedPassword = hashedPassword;
    }

    public User() {

    }

    @PrePersist
    public void ensureId() {
        userID = "CU"+ Helpers.randomNumber();
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
        this.hashedPassword = Helpers.stringToHash(hashedPassword);
    }


}
