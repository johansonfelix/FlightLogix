package com.FlightLogix.Persistence.Logs;


import com.FlightLogix.Core.Logs.BookingLogs;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public class BookingLogsDAO {
    @PersistenceContext(name = "jpa-unit")
    private EntityManager em;

    public void createBookingLog(BookingLogs BookingLog) {
        em.persist(BookingLog);
    }


    
}
