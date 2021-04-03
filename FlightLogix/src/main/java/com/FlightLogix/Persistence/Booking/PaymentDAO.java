package com.FlightLogix.Persistence.Booking;

import com.FlightLogix.Core.Booking.Payment;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public class PaymentDAO {

    //Linked to persistence.xml
    @PersistenceContext(name = "jpa-unit")
    private EntityManager em;

    public void createPayment(Payment Payment) {
        em.persist(Payment);
    }

    public Payment readPayment(String PaymentID) {
        return em.find(Payment.class, PaymentID);
    }

    public void updatePayment(Payment Payment) {
        em.merge(Payment);
    }

    public void deletePayment(Payment Payment) {
        em.remove(Payment);
    }
}
