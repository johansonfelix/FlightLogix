package com.example.Core;

public class Booking {
    private String id;
    private String userId;
    private Payment payment;
    private Flight flight;

    public Booking(String id, String userId, Payment payment, Flight flight) {
        this.id = id;
        this.userId = userId;
        this.payment = payment;
        this.flight = flight;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
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
