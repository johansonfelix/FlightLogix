package com.FlightLogix.Persistence.Flight;

import com.FlightLogix.Core.Flight.Flight;

import javax.enterprise.context.RequestScoped;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@RequestScoped
public class FlightDAO {
    //Linked to persistence.xml
    @PersistenceContext(name = "jpa-unit")
    private EntityManager em;

    public void createFlight(Flight Flight) {
        em.persist(Flight.getItinerary());
        em.persist(Flight.getPrice());
        em.persist(Flight);
    }

    public Flight readFlight(String flightID) {
        return em.find(Flight.class, flightID);
    }

    public void updateFlight(Flight flight) {
        em.merge(flight);
    }

    public void deleteFlight(Flight flight) {
        em.remove(flight);
    }

    public List<Flight> readAllFlights() {
        return em.createNamedQuery("Flight.findAll", Flight.class).getResultList();
    }

    public List<Flight> findFlight(String FlightID) {
        return em.createNamedQuery("Flight.findFlight", Flight.class)
                .setParameter("flightID", FlightID).getResultList();
    }
}
