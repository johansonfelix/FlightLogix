import {React, useState, useEffect} from 'react';
import {sendRequest} from "./../Utils/httpRequestMaker"
import FlightResults from './FlightResults';
import {todaysDate} from "./../Utils/General"
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';


var flightParser = require("./../Utils/flightParser")

export default function TransitionsModal(props) {
  const [mode, setMode] = useState("fetching")
  const [searchResults, setSearchResults] = useState()
  
  useEffect(() => {
    let flight = props.booking.flight
    let search = {
      originLocationCode: flightParser.getFirstOutboundLeg(flight).from.iatacode,
      destinationLocationCode: flightParser.getLastOutboundLeg(flight).to.iatacode,
      departureDate: flightParser.parseDate(flightParser.getFirstOutboundLeg(flight).from.time),
      returnDate: flight.flightType==="ROUND_TRIP"?flightParser.parseDate(flightParser.getFirstInboundLeg(flight).from.time): null,
      numAdults: 1, //to be changed
      maxResults: 10
    }
    sendRequest("POST", "/app/booking/search",props.token, JSON.stringify(search))
    .then(response => response.json())
    .then(responseJson =>{
        console.log("Received flight data: " + JSON.stringify(responseJson))
        var flights = responseJson["flights"]
        if(flights){
            var searchResults = [];
            for(var i = 0; i < flights.length; i++){
                searchResults.push(flights[i])
            }
            setSearchResults(searchResults);   
            setMode("showing_results")             
        }
        else{
           setMode("error")
        }
        

    })
    .catch(err => {console.log(err)})
  }, [props.booking.flight, props.token]);
 


  const handleClose = () => {
    props.setShowModal(false);
  };
 


  return (
    

    
    <div>
    {console.log("what is showmodal: "+props.showModal)}
  
<Dialog
        open={props.showModal}
       
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >

<DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          {mode==="fetching" && <p>Fetching related flights..</p>}
            {mode==="showing_results" && 
          <FlightResults 
            style={{ justify: 'center'}}
              flights={searchResults} 
              onSelect={ newFlight => {
                setMode("modifying_booking")
                console.log("DATE:" + todaysDate())
                sendRequest("PUT", props.isAdmin === false?"/app/booking/update":"/app/admin/update", props.token, JSON.stringify({
                  bookingID: props.booking.bookingID,
                  userEmail:props.booking.userEmail,
                  payment:{
                    base:newFlight.price.base,
                    total: newFlight.price.total,
                    currency: "CAD",
                    paymentDate: todaysDate(),
                    PAYMENT_METHOD:"PAYPAL"
                  },
                  flight:newFlight
                }))
                .then(response => response.json())
                .then(responseJson => {
                  console.log(responseJson)
                  if(responseJson === "OK"){
                    setMode("booking_modified")
                  }
                })
              }}/>

            }
             {mode==="error" &&
              <div>No flights to show at this time..</div>
            }
            {mode==="modifying_booking" &&
              <div>Changing booking..</div>
            }
            {
              mode==="booking_modified" && 
              <div>Booking modified successfully. {window.location.reload(false)}</div>
             
            }
           </DialogContentText>
        </DialogContent>


          </Dialog>
             
            
    </div>
  );
}
