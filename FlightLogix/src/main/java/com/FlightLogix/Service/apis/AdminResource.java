package com.FlightLogix.Service.apis;


import com.FlightLogix.Core.Booking.Booking;
import com.FlightLogix.Core.User.User;
import com.FlightLogix.Repository.BookingOperations.BookingManager;
import com.FlightLogix.Repository.UserOperations.UserManager;

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

    @Inject
    UserManager userManager;


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
        Booking booking = bookingManager.getBooking(bookingID);
        return Response.ok(booking).build();
    }

    @GET
    @Path("get-all-bookings/{email}")
    @RolesAllowed({"ADMIN"})
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllCustomerBookings(@PathParam("email") String email) {
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


    @GET
    @Path("allcustomers/")
    @RolesAllowed({"ADMIN"})
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllCustomers() {
        List<User> users = userManager.findAllCustomers();

        return Response.ok(users).build();
    }






}
