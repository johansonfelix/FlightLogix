package com.FlightLogix.Service.apis;

import com.FlightLogix.Core.Security.AuthenticationToken;
import com.FlightLogix.Core.Security.Credentials;
import com.FlightLogix.Repository.AuthenticationOperations.LoginManager;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
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
@Path("logout")
public class LogoutResource {

    @Inject
    LoginManager loginManager;

    @Transactional
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({"ADMIN", "CUSTOMER"})
    public Response invalidateToken(String email) {
       loginManager.logOut(email);
        return Response.ok().build();
    }
}
