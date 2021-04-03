package com.FlightLogix.Core.Logs;

import com.FlightLogix.Core.Booking.Booking;
import com.FlightLogix.Core.User.User;

import javax.persistence.*;
import java.sql.Timestamp;


@Entity
public class BookingLogs {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bookingID")
    private Booking booking;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userID")
    private User user;

    private String operation;
    private Timestamp timestamp;

    public BookingLogs(Booking booking, User user, String operation, Timestamp timestamp) {
        this.booking = booking;
        this.user = user;
        this.operation = operation;
        this.timestamp = timestamp;
    }

    public BookingLogs() {

    }

    public Booking getBooking() {
        return booking;
    }

    public void setBooking(Booking booking) {
        this.booking = booking;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getOperation() {
        return operation;
    }

    public void setOperation(String operation) {
        this.operation = operation;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }
}
