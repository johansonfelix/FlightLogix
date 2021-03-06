import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';


var flightParser = require("./../Utils/flightParser")
//The pop up will expand based on the size of 
function getConnectingFlights(legs){
  var connectingFlights = []
  for(var i = 0; i < legs.length; i++){
    var currentLeg = legs[i]
    connectingFlights.push(
      <div>CARRIER {flightParser.parseTime(legs[i].from.time)} {legs[i].from.iatacode}<ArrowForwardIcon/>{flightParser.parseTime(legs[i].to.time)} {legs[i].to.iatacode}</div>
    )
  }
  return connectingFlights
}

export default function BookingDetails(props) {

  let flight = props.selectedFlight
  let outboundLegs = flightParser.getOutboundLegs(flight)
  let inboundLegs;
  let firstOutboundLeg = flightParser.getFirstOutboundLeg(flight)
  let lastOutboundLeg = flightParser.getLastOutboundLeg(flight)
  let firstInboundLeg;
  let outboundCarrierCode = firstOutboundLeg.carrierCode;
  let inboundCarrierCode = null;

  let oneWay = flight.flightType==="ONE_WAY"?true:false
  if(!oneWay){
    firstInboundLeg = flightParser.getFirstInboundLeg(flight)
    inboundLegs = flightParser.getInboundLegs(flight)
    inboundCarrierCode = firstInboundLeg.carrierCode;
  }
  return (
    <React.Fragment>
    
      <Typography variant="h6" gutterBottom>
       Booking Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
        <Typography variant="button" gutterBottom>
       Passengers
      </Typography>

        </Grid>
        <Grid item xs={12} sm={6}>
          {props.passengers}
        </Grid>
        <Grid item xs={12} sm={6}>
        <Typography variant="button" gutterBottom>
       Departure
      </Typography> <img  alt="complex" style={{ margin: "20px", width:"100px"}} src={"https://daisycon.io/images/airline/?width=300&height=150&color=ffffff&iata="+outboundCarrierCode}/>
        </Grid>
        <Grid item xs={12}  sm={6}>
        {firstOutboundLeg.from.iatacode}<br/>
        Terminal {firstOutboundLeg.from.terminal} @ {flightParser.parseDate(firstOutboundLeg.from.time)} [ {flightParser.parseTime(firstOutboundLeg.from.time)} ]
        </Grid>
        {!oneWay &&

            <Grid item xs={12} sm={6}>
            <Typography variant="button" gutterBottom>
       Return
      </Typography> <img  alt="complex" style={{ margin: "20px", width:"100px"}} src={"https://daisycon.io/images/airline/?width=300&height=150&color=ffffff&iata="+inboundCarrierCode}/>
            </Grid>
        }
        {!oneWay &&
            <Grid item xs={12} sm={6}>
            {firstInboundLeg.from.iatacode}<br/>
              Terminal {firstInboundLeg.from.terminal} @ {flightParser.parseDate(firstInboundLeg.from.time)} [ {flightParser.parseTime(firstInboundLeg.from.time)} ]
            </Grid>
        }
        {outboundLegs.length > 1 && <Grid item xs={12} sm={6}>
        <Typography variant="button" gutterBottom>
       Outbound Connecting Flights 
      </Typography>
        </Grid>
        }
        {outboundLegs.length > 1 && 
        <Grid item xs={12} sm={6}>
          {getConnectingFlights(outboundLegs)}
        </Grid>
        }
        {(!oneWay && inboundLegs.length > 1) && 
        <Grid item xs={12} sm={6}>
         <Typography variant="button" gutterBottom>
       Inbound Connecting Flights
      </Typography>
          </Grid>
        }
        {(!oneWay && inboundLegs.length > 1) && <Grid item xs={12} sm={6}>
            {getConnectingFlights(inboundLegs)}
        </Grid>
        }
        <Grid item xs={12} sm={6}>
        <Typography variant="button" gutterBottom>
       Cost
      </Typography>

        </Grid>
        <Grid item xs={12} sm={6}>
        <Typography variant="button" gutterBottom>

          CA${props.passengers * flight.price.total} </Typography>
        </Grid>
        {/* <Grid item xs={12}>
          
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}