package com.FlightLogix.Persistence.User;

import com.FlightLogix.Core.User.User;


import javax.enterprise.context.RequestScoped;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@RequestScoped
public class UserDAO {

    //Linked to persistence.xml
    @PersistenceContext(name = "jpa-unit")
    private EntityManager em;

    public void createUser(User user) {

        em.persist(user);
    }

    public User readUser(String userId) {
        return em.find(User.class, userId);
    }

    public void updateUser(User user) {
        em.merge(user);
    }

    public void deleteUser(User user) {
        em.remove(user);
    }

    public List<User> readAllUsers() {
        return em.createNamedQuery("User.findAll", User.class).getResultList();
    }

    public List<User> findUser(String userID) {
        return em.createNamedQuery("User.findUser", User.class)
                .setParameter("userID", userID).getResultList();
    }

}
