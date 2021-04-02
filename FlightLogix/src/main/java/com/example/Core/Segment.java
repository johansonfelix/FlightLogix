package com.example.Core;

import java.util.ArrayList;

public class Segment {
    private ArrayList<Leg> legs; // the way to destination
    public Segment(ArrayList<Leg> legs){
        this.legs = legs;
    }
    public ArrayList<Leg> getLegs() {
        return legs;
    }

    public void setLegs(ArrayList<Leg> legs) {
        this.legs = legs;
    }




}
