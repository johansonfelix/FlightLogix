package com.FlightLogix.Core.Flight;

import javax.persistence.*;

@Entity
public class Leg {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn
    private Location from;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn
    private Location to;

    public Leg(Location from, Location to){
        this.from = from;
        this.to = to;
    }

    public Leg() {

    }

    public Location getFrom() {
        return from;
    }

    public void setFrom(Location from) {
        this.from = from;
    }

    public Location getTo() {
        return to;
    }

    public void setTo(Location to) {
        this.to = to;
    }



}
