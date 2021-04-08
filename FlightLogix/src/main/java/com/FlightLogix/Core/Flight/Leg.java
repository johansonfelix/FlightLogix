package com.FlightLogix.Core.Flight;

import javax.persistence.*;

@Entity
public class Leg {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    /*@JoinColumn*/
    private Location from;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    /*@JoinColumn*/
    private Location to;

    private String carrierCode;

    public Leg(Location from, Location to, String carrierCode){
        this.from = from;
        this.to = to;
        this.carrierCode = carrierCode;
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

    public String getCarrierCode(){
        return this.carrierCode;
    }
    public void setCarrierCode(String carrierCode){
        this.carrierCode = carrierCode;
    }



}
