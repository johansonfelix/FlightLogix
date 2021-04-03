package com.FlightLogix.Core.Booking;

import com.FlightLogix.Core.Flight.Price;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Date;


@Entity
public class Payment extends Price {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    String id;

    public Payment() {

    }

    public enum PAYMENT_METHOD{
        PAYPAL
    }

    private Date paymentDate;
    private PAYMENT_METHOD paymentMethod;

    public Payment(Price price, Date paymentDate, PAYMENT_METHOD paymentMethod) {
        super(price.getBase(), price.getTotal(), price.getCurrency());
        this.paymentDate = paymentDate;
        this.paymentMethod = paymentMethod;
    }

    public Date getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(Date paymentDate) {
        this.paymentDate = paymentDate;
    }

    public PAYMENT_METHOD getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(PAYMENT_METHOD paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

}
