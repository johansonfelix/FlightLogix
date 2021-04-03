package com.FlightLogix.Persistence.Flight;

import com.FlightLogix.Core.Flight.Price;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public class PriceDAO {
    @PersistenceContext(name = "jpa-unit")
    private EntityManager em;

    public void createPrice(Price Price) {
        em.persist(Price);
    }

    public Price readPrice(String PriceID) {
        return em.find(Price.class, PriceID);
    }

    public void updatePrice(Price Price) {
        em.merge(Price);
    }

    public void deletePrice(Price Price) {
        em.remove(Price);
    }
}
