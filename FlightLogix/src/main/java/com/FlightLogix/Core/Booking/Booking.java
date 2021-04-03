package com.FlightLogix.Core.Booking;


import com.FlightLogix.Core.Flight.Flight;
import com.FlightLogix.Core.User.User;

import javax.persistence.*;

@Entity
@Table(name = "booking")
@NamedQuery(name="Booking.findAll", query="SELECT e from Booking e")
@NamedQuery(name="Booking.findBooking", query="SELECT E from Booking e WHERE e.bookingID = :bookingID")
public class Booking {

    @Id
    private String bookingID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private User user;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn
    private Payment payment;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn
    private Flight flight;

    public Booking(String id, User user, Payment payment, Flight flight) {
        this.bookingID = id;
        this.user = user;
        this.payment = payment;
        this.flight = flight;
    }

    public Booking() {

    }

    public String getId() {
        return bookingID;
    }

    public void setId(String id) {
        this.bookingID = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Payment getPayment() {
        return payment;
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
    }

    public Flight getFlight() {
        return flight;
    }

    public void setFlight(Flight flight) {
        this.flight = flight;
    }
}
