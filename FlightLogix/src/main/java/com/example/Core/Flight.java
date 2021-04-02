package com.example.Core;

public class Flight {
    public enum FLIGHT_TYPE{
        ONE_WAY,
        ROUND_TRIP
    }
    private FLIGHT_TYPE flightType;
    private Itinerary itinerary;
    private Price price;

    public Itinerary getItinerary() {
        return itinerary;
    }

    public void setItinerary(Itinerary itinerary) {
        this.itinerary = itinerary;
    }

    public Price getPrice() {
        return price;
    }

    public void setPrice(Price price) {
        this.price = price;
    }

    public FLIGHT_TYPE getFlightType() {
        return flightType;
    }

    public void setFlightType(FLIGHT_TYPE flightType) {
        this.flightType = flightType;
    }

}
