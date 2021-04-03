package com.FlightLogix.Persistence.Flight;

import com.FlightLogix.Core.Flight.Itinerary;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public class ItineraryDAO {

    //Linked to persistence.xml
    @PersistenceContext(name = "jpa-unit")
    private EntityManager em;

    public void createItinerary(Itinerary Itinerary) {

        em.persist(Itinerary.getOutbound());
        em.persist(Itinerary.getInbound());
        em.persist(Itinerary);
    }

    public Itinerary readItinerary(String ItineraryID) {
        return em.find(Itinerary.class, ItineraryID);
    }

    public void updateItinerary(Itinerary Itinerary) {
        em.merge(Itinerary);
    }

    public void deleteItinerary(Itinerary Itinerary) {
        em.remove(Itinerary);
    }
}
