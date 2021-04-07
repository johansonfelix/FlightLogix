package com.FlightLogix.Service.apis;

import com.FlightLogix.Core.Booking.Search;
import com.FlightLogix.Core.Flight.Flight;
import com.FlightLogix.Repository.AmadeusAPICaller;

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
import java.util.ArrayList;

@RequestScoped
@Path("booking")
public class BookingResource {


    AmadeusAPICaller apiCaller = AmadeusAPICaller.getInstance();

    @Transactional
    @POST
    @Path("search")
    @PermitAll      //change to @RolesAllowed({"ADMIN", "CUSTOMER"})
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response bookingSearch(Search search){

        System.out.println("Hello from bookingSearch");
        ArrayList<Flight> flights = apiCaller.getFlightList(search);

        return Response.ok(flights).build();

    }


}
