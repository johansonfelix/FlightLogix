package com.example.HelloWorld;



import javax.enterprise.context.RequestScoped;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;


@RequestScoped
public class UserDao {

    @PersistenceContext(name = "jpa-unit")
    private EntityManager em2;

    public void createUser(User user) {
       em2.persist(user);
    }

    public String readUser(int userId) {
        return em2.find(User.class, userId).getName();
    }

    public void updateUser(User user) {
        em2.merge(user);
    }

    public void deleteUser(User user) {
        em2.remove(user);
    }

    public List<User> readAllUsers() {
        return em2.createNamedQuery("User.findAll", User.class).getResultList();
    }

    public List<User> findUser(String name) {
        return em2.createNamedQuery("User.findUser", User.class)
                .setParameter("name", name).getResultList();
    }
}
