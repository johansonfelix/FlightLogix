package com.FlightLogix.Persistence.Booking;

import com.FlightLogix.Core.Booking.Booking;

import javax.enterprise.context.RequestScoped;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@RequestScoped
public class BookingDAO {

    //Linked to persistence.xml
    @PersistenceContext(name = "jpa-unit")
    private EntityManager em;

    public void createBooking(Booking booking) {
        /*em.persist(booking.getPayment());*/

        em.persist(booking);
    }

    public Booking findBooking(String bookingId) {
        return em.find(Booking.class, bookingId);
    }

    public void updateBooking(Booking booking) {

        em.merge(booking);
    }

    public void deleteBooking(String bookingID) {
        System.out.println("Here1");
        Booking b = findBooking(bookingID);
        em.remove(b);
        System.out.println("Here2");
    }

    public List<Booking> findAllBookings() {
        return em.createQuery("SELECT e from Booking e", Booking.class).getResultList();

    }

    public List<Booking> findAllCustomerBookings(String email) {
        return em.createQuery("SELECT e from Booking e WHERE e.userEmail=:email", Booking.class).setParameter("email", email).getResultList();
    }
}
