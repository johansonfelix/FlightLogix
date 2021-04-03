package com.FlightLogix.Persistence.Flight;

import com.FlightLogix.Core.Flight.Location;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public class LocationDAO {
    //Linked to persistence.xml
    @PersistenceContext(name = "jpa-unit")
    private EntityManager em;

    public void createLocation(Location Location) {
        em.persist(Location);
    }

    public Location readLocation(String LocationID) {
        return em.find(Location.class, LocationID);
    }

    public void updateLocation(Location Location) {
        em.merge(Location);
    }

    public void deleteLocation(Location Location) {
        em.remove(Location);
    }
}
