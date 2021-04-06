package com.FlightLogix.Service.apis;

import javax.annotation.security.DenyAll;
import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;


@RequestScoped
@Path("test")
public class TestResource {

    @GET
    @Path("/all")
    @PermitAll
    @Produces(MediaType.APPLICATION_JSON)
    public String HelloWorld() {
        return "Hello Permit All";
    }

    @GET
    @Path("/admin")
    @RolesAllowed({"ADMIN"})
    @Produces(MediaType.APPLICATION_JSON)
    public String HelloAdmin() {

        return "Hello Admin";

    }

    @GET
    @Path("/customer")
    @RolesAllowed({"CUSTOMER"})
    @Produces(MediaType.APPLICATION_JSON)
    public String HelloCustomer() {
        return "Hello Customer";
    }

    @GET
    @Path("/both")
    @RolesAllowed({"ADMIN", "CUSTOMER"})
    @Produces(MediaType.APPLICATION_JSON)
    public String HelloBoth() {
        return "Hello both";
    }

    @GET
    @Path("/none")
    @DenyAll
    @Produces(MediaType.APPLICATION_JSON)
    public String HelloNone() {
        return "Hello No one";
    }

}
