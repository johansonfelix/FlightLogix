package com.FlightLogix.Core.Flight;


import javax.persistence.*;

@Entity
public class Itinerary {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Segment outbound; // To dest

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Segment inbound; // Back to origin

    public Itinerary(Segment outbound, Segment inbound){
        this.outbound = outbound;
        this.inbound = inbound;
    }

    public Itinerary() {

    }

    public Segment getOutbound() {
        return outbound;
    }

    public void setOutbound(Segment outbound) {
        this.outbound = outbound;
    }

    public Segment getInbound() {
        return inbound;
    }

    public void setInbound(Segment inbound) {
        this.inbound = inbound;
    }
}
