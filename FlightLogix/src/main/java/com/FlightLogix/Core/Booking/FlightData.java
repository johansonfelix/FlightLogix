package com.FlightLogix.Core.Booking;

import com.FlightLogix.Core.Flight.Flight;

import java.util.ArrayList;
import java.util.HashMap;
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
