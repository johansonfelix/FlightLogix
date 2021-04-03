package com.FlightLogix.Core.Flight;

import com.FlightLogix.Core.Flight.Leg;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Segment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;

    @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn
    private List<Leg> legs; // the way to destination

    public Segment(List<Leg> legs){
        this.legs = legs;
    }

    public Segment() {

    }

    public List<Leg> getLegs() {
        return legs;
    }

    public void setLegs(ArrayList<Leg> legs) {
        this.legs = legs;
    }




}
