package com.FlightLogix.Repository;

import com.FlightLogix.Core.Flight.Flight;
import com.FlightLogix.Persistence.Flight.FlightDAO;

import javax.inject.Inject;

public class FlightManager {
    @Inject
    FlightDAO flightDAO;
    private static FlightManager flightManager = new FlightManager();
    public enum ResponseCode{
        SUCCESS
    }
    private FlightManager(){

    }
    public static FlightManager getInstance(){
        return flightManager;
    }
    public Flight getFlight(String flightId){
        return flightDAO.findFlight(flightId);
    }
}
