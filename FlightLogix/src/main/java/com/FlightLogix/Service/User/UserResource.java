package com.FlightLogix.Service.User;

import com.FlightLogix.Core.User.User;
import com.FlightLogix.Persistence.User.UserDAO;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.UriInfo;
import java.net.URI;

@RequestScoped
@Path("/user")
public class UserResource {

    @Inject
    UserDAO users;

    @Transactional
    @POST
    @Path("/register")
    @Consumes(MediaType.APPLICATION_JSON)
    public String registerUser(User user){
        users.createUser(user);
        return "User created";

    }

    @GET
    @Path("/getUser/{id}")
    @Consumes(MediaType.TEXT_PLAIN)
    public User registerUser(@PathParam("id") String userID){

        return users.findUser(userID);

    }

    @GET
    public String hello(){
        return "HelloWorld";
    }
}
