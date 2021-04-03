package com.FlightLogix.Persistence.Flight;

import com.FlightLogix.Core.Flight.Segment;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public class SegmentDAO {
    @PersistenceContext(name = "jpa-unit")
    private EntityManager em;

    public void createSegment(Segment Segment) {
        em.persist(Segment.getLegs());
        em.persist(Segment);
    }

    public Segment readSegment(String SegmentID) {
        return em.find(Segment.class, SegmentID);
    }

    public void updateSegment(Segment Segment) {
        em.merge(Segment);
    }

    public void deleteSegment(Segment Segment) {
        em.remove(Segment);
    }
}
