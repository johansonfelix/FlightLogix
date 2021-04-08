package com.FlightLogix.Service.apis;

import com.FlightLogix.Core.Booking.Booking;
import com.FlightLogix.Core.Booking.FlightData;
import com.FlightLogix.Core.Booking.Search;
import com.FlightLogix.Repository.AmadeusAPICaller;
import com.FlightLogix.Repository.BookingOperations.BookingManager;

import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@RequestScoped
@Path("booking")
public class BookingResource {

    //Add filter to check that token email matches
    @Inject
    BookingManager bookingManager;

    AmadeusAPICaller apiCaller = AmadeusAPICaller.getInstance();

    @Transactional
    @POST
    @Path("search")
    @RolesAllowed({"ADMIN", "CUSTOMER"})
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response bookingSearch(Search search) {

        System.out.println("Hello from bookingSearch");
        FlightData data = apiCaller.getParsedData(search);

        return Response.ok(data).build();

    }

    @Transactional
    @POST
    @Path("book")
    @RolesAllowed({"CUSTOMER"})
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createBooking(Booking booking) {

        bookingManager.createBooking(booking);

        return Response.ok(Response.Status.CREATED).build();

    }

    @GET
    @Path("get/{bookingID}")
    @RolesAllowed({"CUSTOMER"})
    @Produces(MediaType.APPLICATION_JSON)
    public Response getBooking(@PathParam("bookingID") String bookingID) {
        Booking booking = bookingManager.getBooking(bookingID);
        return Response.ok(booking).build();
    }

    @GET
    @Path("get_bookings/{email}")
    @RolesAllowed({"CUSTOMER"})
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllCustomerBookings(@PathParam("email") String email) {

        List<Booking> bookings = bookingManager.getCustomerBookings(email);
        return Response.ok(bookings).build();
    }


    @Transactional
    @PUT
    @Path("update")
    @RolesAllowed({"CUSTOMER"})
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllCustomerBookings(Booking booking) {
        bookingManager.modifyBooking(booking.getId(), booking);
        return Response.ok(Response.Status.OK).build();
    }

    @Transactional
    @DELETE
    @Path("cancel")
    @RolesAllowed({"CUSTOMER"})
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response cancelBooking(String bookingID) {
        bookingManager.deleteBooking(bookingID);
        return Response.status(Response.Status.OK).build();
    }








}
