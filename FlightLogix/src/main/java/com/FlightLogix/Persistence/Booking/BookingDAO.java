package com.FlightLogix.Persistence.Booking;

import com.FlightLogix.Core.Booking.Booking;

import javax.enterprise.context.RequestScoped;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@RequestScoped
public class BookingDAO {

    //Linked to persistence.xml
    @PersistenceContext(name = "jpa-unit")
    private EntityManager em;

    public void createBooking(Booking booking) {
        em.persist(booking.getPayment());
        em.persist(booking.getFlight());
        em.persist(booking);
    }

    public Booking readBooking(String bookingId) {
        return em.find(Booking.class, bookingId);
    }

    public void updateBooking(Booking booking) {
        em.merge(booking);
    }

    public void deleteBooking(Booking booking) {
        em.remove(booking);
    }

    public List<Booking> findAllBookings() {
        return em.createNamedQuery("Booking.findAll", Booking.class).getResultList();
    }

    public List<Booking> findBooking(String bookingID) {
        return em.createNamedQuery("Booking.findBooking", Booking.class)
                .setParameter("bookingID", bookingID).getResultList();
    }

}
