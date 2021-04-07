package com.FlightLogix.Persistence.User;

import com.FlightLogix.Core.User.Role;
import com.FlightLogix.Core.User.User;
import com.FlightLogix.Core.User.UserRegistration;


import javax.enterprise.context.RequestScoped;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@RequestScoped
public class UserDAO {

    //Linked to persistence.xml
    @PersistenceContext(name = "jpa-unit")
    private EntityManager em;

    public void createUser(UserRegistration user) {
        User u = new User(user.getFirstName(), user.getLastName(), user.getEmail(), user.getPassword());
        u.setRole(Role.CUSTOMER);
        em.persist(u);
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
        List<User> users = em.createQuery("SELECT e FROM User e WHERE e.email= :email", User.class).setParameter("email", email).setMaxResults(1).getResultList();

        if(users.isEmpty()){
            return null;
        }
        return users.get(0);
    }
    public List<User> findAllCustomers(){
        return em.createQuery("SELECT e FROM User e WHERE e.role='CUSTOMER'", User.class).getResultList();
    }

    public List<User> findAll(){
        return em.createQuery("SELECT e from User e", User.class).getResultList();
    }

}
