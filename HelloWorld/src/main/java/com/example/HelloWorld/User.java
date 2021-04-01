package com.example.HelloWorld;

import javax.persistence.*;
import java.io.Serializable;


@Entity
@Table(name = "user")
@NamedQuery(name = "User.findAll", query = "SELECT e FROM User e")
@NamedQuery(name = "User.findUser", query = "SELECT e FROM User e WHERE "
        + "e.name = :name")
public class User implements Serializable {
    private static final long serialVersionUID = 1L;

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    @Column(name = "userId")
    int id;

    @Column(name = "name")
    String name;

    public User(){}

    public User(String name){
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
