package com.FlightLogix.Service.apis;

import com.FlightLogix.Core.Security.Credentials;
import com.FlightLogix.Service.filters.InvalidateToken;
import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
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


    @Transactional
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({"ADMIN", "CUSTOMER"})
    @InvalidateToken
    public Response invalidateToken() {

        return Response.ok("INVALIDATED").build();
    }
}
