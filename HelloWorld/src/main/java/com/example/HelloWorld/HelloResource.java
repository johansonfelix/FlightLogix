package com.example.HelloWorld;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

@RequestScoped
@Path("helloworld")
public class HelloResource {

    @Inject
    UserDao userDao;

    @GET
    @Produces("text/plain")
    public String hello() {

        if (userDao.readAllUsers().size()==0)
            return "DB empty but Hello World still!";
        else
            return "Hello, " + userDao.findUser("johanson").get(0).getName();
    }

    @Transactional
    @GET
    @Path("/create/{name}")
    @Produces("text/plain")
    public String hello(@PathParam("name") String name) {
        userDao.createUser(new User(name));
        return "Hello, " + userDao.findUser(name).get(0).getName();
    }
}