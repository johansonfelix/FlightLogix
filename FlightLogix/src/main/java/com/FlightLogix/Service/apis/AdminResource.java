package com.FlightLogix.Service.apis;


import com.FlightLogix.Core.Booking.Booking;
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
@Path("admin")
public class AdminResource {


    @Inject
    BookingManager bookingManager;


    @GET
    @Path("allbookings")
    @RolesAllowed({"ADMIN"})
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllBookings(){

        List<Booking> bookings = bookingManager.getAllBookings();

        return Response.ok(bookings).build();


    }
    @Transactional
    @POST
    @Path("create_booking")
    @RolesAllowed({"ADMIN"})
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createBooking(Booking booking) {

        bookingManager.createBooking(booking);

        return Response.ok(Response.Status.CREATED).build();

    }

    @GET
    @Path("get/{bookingID}")
    @RolesAllowed({"ADMIN"})
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getBooking(@PathParam("bookingID") String bookingID) {
        System.out.println("Received booking request 1");
        Booking booking = bookingManager.getBooking(bookingID);
        System.out.println("Received booking request 2");
        return Response.ok(booking).build();
    }

    @GET
    @Path("get-all-bookings")
    @RolesAllowed({"ADMIN"})
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllCustomerBookings(String email) {
        List<Booking> bookings = bookingManager.getCustomerBookings(email);
        return Response.ok(bookings).build();
    }


    @Transactional
    @PUT
    @Path("update")
    @RolesAllowed({"ADMIN"})
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllCustomerBookings(Booking booking) {
        bookingManager.modifyBooking(booking);
        return Response.ok(Response.Status.OK).build();
    }

    @Transactional
    @DELETE
    @Path("cancel/{bookingID}")
    @RolesAllowed({"ADMIN"})
    @Produces(MediaType.APPLICATION_JSON)
    public Response cancelBooking(@PathParam("bookingID") String bookingID) {
        bookingManager.deleteBooking(bookingID);
        return Response.ok(Response.Status.OK).build();
    }



}
