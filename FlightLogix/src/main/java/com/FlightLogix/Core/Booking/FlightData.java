package com.FlightLogix.Core.Booking;

import com.FlightLogix.Core.Flight.Flight;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.ArrayList;
import java.util.HashMap;
@XmlRootElement(name = "flight_data")
@XmlAccessorType(XmlAccessType.PROPERTY)
public class FlightData {
    private ArrayList<Flight> flights;
    private HashMap<String,String> carrierNames; // Carrier Code to Carrier name.

    public FlightData(){

    }
    public ArrayList<Flight> getFlights() {
        return flights;
    }

    public void setFlights(ArrayList<Flight> flights) {
        this.flights = flights;
    }

    public HashMap<String,String> getCarrierNames() {
        return carrierNames;
    }

    public void setCarrierNames(HashMap<String,String> carrierNames) {
        this.carrierNames = carrierNames;
    }



}
