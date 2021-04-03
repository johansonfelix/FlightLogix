package com.FlightLogix.Persistence.Flight;

import com.FlightLogix.Core.Flight.Leg;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public class LegDAO {

    //Linked to persistence.xml
    @PersistenceContext(name = "jpa-unit")
    private EntityManager em;

    public void createLeg(Leg Leg) {

        em.persist(Leg.getTo());
        em.persist(Leg.getTo());
        em.persist(Leg);
    }

    public Leg readLeg(String LegID) {
        return em.find(Leg.class, LegID);
    }

    public void updateLeg(Leg Leg) {
        em.merge(Leg);
    }

    public void deleteLeg(Leg Leg) {
        em.remove(Leg);
    }
}
