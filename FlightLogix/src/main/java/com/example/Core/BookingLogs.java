package com.example.Core;

import java.sql.Timestamp;

public class BookingLogs {
    private String bookingId;
    private String userId;
    private String operation;
    private Timestamp timestamp;

    public BookingLogs(String bookingId, String userId, String operation, Timestamp timestamp) {
        this.bookingId = bookingId;
        this.userId = userId;
        this.operation = operation;
        this.timestamp = timestamp;
    }

    public String getBookingId() {
        return bookingId;
    }

    public void setBookingId(String bookingId) {
        this.bookingId = bookingId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
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
