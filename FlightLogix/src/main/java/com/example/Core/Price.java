package com.example.Core;

public class Price {
    private double base;
    private String currency;
    private double total;

    public Price(double base, double total, String currency){
        this.base = base;
        this.total = total;
        this.currency = currency;
    }
    public double getBase() {
        return base;
    }

    public void setBase(double base) {
        this.base = base;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }



}
