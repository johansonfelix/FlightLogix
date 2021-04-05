package com.FlightLogix.Persistence.User;

import com.FlightLogix.Core.User.User;


import javax.enterprise.context.RequestScoped;
import javax.persistence.EntityManager;
import javax.persistence.NamedQuery;
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

    public User findUser(String userId) {
        return em.find(User.class, userId);
    }

    public void updateUser(User user) {
        em.merge(user);
    }

    public void deleteUser(User user) {
        em.remove(user);
    }

    public User findUserByEmail(String email){
        List<User> users = em.createQuery("SELECT e FROM User WHERE e.email= :email", User.class).setParameter("email", email).setMaxResults(1).getResultList();

        if(users.isEmpty()){
            return null;
        }
        return users.get(0);
    }

    public List<User> findAll(){
        return em.createQuery("SELECT e from User e", User.class).getResultList();
    }

}
