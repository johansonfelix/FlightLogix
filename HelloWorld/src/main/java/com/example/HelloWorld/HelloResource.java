package com.example.HelloWorld;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
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
    public String helloWorld() {

       return "Hello, World";
    }

    @GET
    @Path("{name}")
    @Produces("text/plain")
    public String helloName(@PathParam("name") String name) {

        if (userDao.findUser(name).size()==0)
            return "Name not in DB but Hello World still!";
        else
            return "Hello, " + userDao.findUser(name).get(0).getName();
    }
    @Transactional
    @GET
    @Path("/create/{name}")
    @Produces("text/plain")
    public String helloCreate(@PathParam("name") String name) {
        userDao.createUser(new User(name));
        return "Hello, " + userDao.findUser(name).get(0).getName();
    }
}