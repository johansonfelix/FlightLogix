package com.example.Core;

public class Itinerary {
    private Segment outbound; // To dest
    private Segment inbound; // Back to origin

    public Itinerary(Segment outbound, Segment inbound){
        this.outbound = outbound;
        this.inbound = inbound;
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
