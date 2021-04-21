package com.FlightLogix.Repository.BookingOperations;

import com.FlightLogix.Core.Booking.Booking;
import com.FlightLogix.Core.User.User;
import com.FlightLogix.Persistence.Booking.BookingDAO;
import com.FlightLogix.Persistence.User.UserDAO;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.List;


@ApplicationScoped
public class BookingManager {

    @Inject
    BookingDAO bookingDAO;
    @Inject
    UserDAO userDAO;
    public enum ResponseCode{
        SUCCESS,
        BOOKING_DOES_NOT_EXIST,
        USER_DOES_NOT_EXIST
    }

    public String createBooking(Booking booking){
        User user = userDAO.findUserByEmail(booking.getUser().getEmail());
        booking.setUser(user);
        bookingDAO.createBooking(booking);
        return ResponseCode.SUCCESS.toString();
    }
    public String deleteBooking(String bookingId){

        Booking bookingToDelete = bookingDAO.findBooking(bookingId);
        if(bookingToDelete == null){
            throw new RuntimeException(ResponseCode.BOOKING_DOES_NOT_EXIST.toString());
        }
        bookingDAO.deleteBooking(bookingToDelete);
        return ResponseCode.SUCCESS.toString();
    }
    public String modifyBooking(Booking newBooking){
        User user = userDAO.findUserByEmail(newBooking.getUser().getEmail());
        if(user!=null) {
            newBooking.setUser(user);
            bookingDAO.updateBooking(newBooking);
            return ResponseCode.SUCCESS.toString();
        }
        return ResponseCode.USER_DOES_NOT_EXIST.toString();
    }

    public Booking getBooking(String bookingID){

        Booking booking = bookingDAO.findBooking(bookingID);
        if(booking == null)
            throw new RuntimeException(ResponseCode.BOOKING_DOES_NOT_EXIST.toString());

        return booking;
    }

    public List<Booking> getCustomerBookings(String email){

        return bookingDAO.findAllCustomerBookings(email);
    }

    public List<Booking> getAllBookings(){
        return bookingDAO.findAllBookings();
    }
}
