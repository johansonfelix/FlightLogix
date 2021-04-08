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

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
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

    public void createEmptyList(){
        legs = new ArrayList<Leg>();
    }
    public void addLeg(Leg leg){
        legs.add(leg);
    }




}
