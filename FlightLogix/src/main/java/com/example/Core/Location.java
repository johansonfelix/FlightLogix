package com.example.Core;

import java.sql.Timestamp;

public class Location {
    private String iatacode;
    private String terminal;
    private Timestamp time;

    public Location(String iatacode, String terminal, Timestamp time){
        this.iatacode = iatacode;
        this.terminal = terminal;
        this.time = time;
    }

    public String getIatacode() {
        return iatacode;
    }

    public void setIatacode(String iatacode) {
        this.iatacode = iatacode;
    }

    public String getTerminal() {
        return terminal;
    }

    public void setTerminal(String terminal) {
        this.terminal = terminal;
    }

    public Timestamp getTime() {
        return time;
    }

    public void setTime(Timestamp time) {
        this.time = time;
    }
}
