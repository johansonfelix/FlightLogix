package com.FlightLogix.Service.User;


import com.FlightLogix.Core.User.User;
import com.FlightLogix.Repository.LoginManager;
import com.FlightLogix.Repository.UserManager;
import org.json.JSONObject;

import javax.enterprise.context.RequestScoped;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@RequestScoped
@Path("/user")
public class UserResource {

    @Transactional
    @POST
    @Path("/register")
    @Consumes(MediaType.APPLICATION_JSON)
    public String registerUser(User user){
        return UserManager.getInstance().register(user).toString();
    }

    @Transactional
    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    public String logIn(String credentials){
        JSONObject jsonObject = new JSONObject(credentials);
        return LoginManager.getInstance().logIn(jsonObject.getString("email"),jsonObject.getString("password"));
    }
}
