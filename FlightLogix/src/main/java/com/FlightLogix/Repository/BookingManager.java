package com.FlightLogix.Repository;

import com.FlightLogix.Core.Booking.Booking;
import com.FlightLogix.Persistence.Booking.BookingDAO;

import javax.inject.Inject;

public class BookingManager {
    private static BookingManager bookingManager = new BookingManager();

    @Inject
    BookingDAO bookingDAO;
    public enum ResponseCode{
        SUCCESS,
        BOOKING_DOES_NOT_EXIST
    }
    private BookingManager(){

    }
    public static BookingManager getInstance(){
        return bookingManager;
    }
    public String createBooking(Booking booking){
        bookingDAO.createBooking(booking);
        return ResponseCode.SUCCESS.toString();
    }
    public String deleteBooking(String bookingId){
        Booking bookingToDelete = bookingDAO.findBooking(bookingId);
        if(bookingToDelete == null){
            return ResponseCode.BOOKING_DOES_NOT_EXIST.toString();
        }
        bookingDAO.deleteBooking(bookingToDelete);
        return ResponseCode.SUCCESS.toString();
    }
    public String modifyBooking(String bookingId, Booking newBooking){
        bookingDAO.updateBooking(newBooking);
        return ResponseCode.SUCCESS.toString();
    }
}
