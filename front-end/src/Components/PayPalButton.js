import React, { useRef, useEffect } from 'react'
import {sendRequest, tokenDecoder} from "./../Utils/httpRequestMaker.js"

export default function PayPalButton(props){
    const paypal = useRef()

    useEffect(() => {
        window.paypal.Buttons({
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
                            user:{email: tokenDecoder(props.token).sub},
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
                    })
                    .catch(err => console.error(err))
                    if(bookingCreationStatus === "CREATED"){
                        // The booking was created successfully on the server-side. 
                    }
                }
            },
            onError: (err) => {
                console.log(err)
            }
        }).render(paypal.current)
    },[])
    return (
        <div>
            <div ref={paypal}></div>
        </div>
    )
}