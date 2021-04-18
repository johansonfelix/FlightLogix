package com.FlightLogix.Service.apis;



import com.FlightLogix.Core.User.User;
import com.FlightLogix.Core.User.UserRegistration;
import com.FlightLogix.Repository.UserOperations.UserManager;
import org.json.JSONObject;

import javax.annotation.security.PermitAll;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@RequestScoped
@Path("register")
public class RegistrationResource {

    @Inject
    UserManager userManager;


    @Transactional
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @PermitAll
    public String register (UserRegistration user){

        userManager.register(user);
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("responseCode:", Response.status(Response.Status.CREATED).build().getStatus());
        return jsonObject.toString();

    }


}
