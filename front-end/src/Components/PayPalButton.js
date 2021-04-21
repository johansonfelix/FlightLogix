import React, { useRef, useEffect } from 'react'
import {sendRequest, tokenDecoder} from "./../Utils/httpRequestMaker.js"

export default function PayPalButton(props){


  
    const paypal = useRef()

    useEffect(() => {
        window.paypal.Buttons({
            style: {
                layout:  'horizontal',
                color:   'gold',
                shape:   'rect',
                label:   'pay',
                tagline: false
              },
            createOrder:(data, actions, err) => {
                return actions.order.create({
                    intent:"CAPTURE",
                    purchase_units:[
                        {
                            description: "DESC",
                            amount:{
                                currency_code: "CAD",
                                value: props.priceTotal
                            }
                        }
                    ]
                })
            },
            onApprove: async(data, actions) => {
                // The payment was processed successfully.
                const order = await (actions.order.capture())
                console.log("Success!")
                console.log(order)
                let flight = props.selectedFlight
                if(order.status==="COMPLETED"){
                    var bookingCreationStatus = sendRequest("POST", "https://localhost:8081/app/booking/book", props.token, JSON.stringify(
                        {
                            user:tokenDecoder(props.token),
                            payment:{
                                base:flight.price.base,
                                currency:"CAD",
                                total:flight.price.total,
                                paymentDate:null,
                                PAYMENT_METHOD:"PAYPAL"
                            },
                            flight:flight
                        }
                    ))
                    .then(response => response.json())
                    .then(responseJson => {
                        console.log(JSON.stringify(responseJson))
                        if(responseJson === "CREATED")
                            props.paymentConfirmed(true);
                    })
                    .catch(err => console.error(err))
                   
                }
            },
            onError: (err) => {
                console.log(err)
            }
        }).render(paypal.current)
    },[])
    return (
        <div >
            <div style={{marginTop: '30px'}}ref={paypal}></div>
        </div>
    )
}