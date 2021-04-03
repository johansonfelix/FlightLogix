package com.FlightLogix.Core.Flight;

import javax.persistence.*;

@Entity
@Table(name = "flight")
@NamedQuery(name = "Flight.findAll", query="SELECT e FROM Flight e")
@NamedQuery(name = "Flight.findFlight", query="SELECT e FROM Flight e WHERE e.flightID = :flightID")
public class Flight {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String flightID;

    public enum FLIGHT_TYPE{
        ONE_WAY,
        ROUND_TRIP
    }

    private FLIGHT_TYPE flightType;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn
    private Itinerary itinerary;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn
    private Price price;

    public Flight(){ }

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
