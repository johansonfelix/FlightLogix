import {React, useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {tokenDecoder, sendRequest} from "./../Utils/httpRequestMaker"
import FlightResults from './FlightResults';
var flightParser = require("./../Utils/flightParser")

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionsModal(props) {
  const classes = useStyles();
  const [mode, setMode] = useState("fetching")
  const [searchResults, setSearchResults] = useState()

  
  useEffect(() => {
    let user = tokenDecoder(props.token)
    let email = user.sub;
    let flight = props.booking.flight
    let search = {
      originLocationCode: flightParser.getFirstOutboundLeg(flight).from.iatacode,
      destinationLocationCode: flightParser.getLastOutboundLeg(flight).to.iatacode,
      departureDate: flightParser.parseDate(flightParser.getFirstOutboundLeg(flight).from.time),
      returnDate: flight.flightType==="ROUND_TRIP"?flightParser.parseDate(flightParser.getFirstInboundLeg(flight).from.time): null,
      numAdults: 1, //to be changed
      maxResults: 10
    }
    sendRequest("POST", "https://localhost:8081/app/booking/search",props.token, JSON.stringify(search))
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
        }
        else{
            // NO FLIGHTS FOUND.
        }
        
        setMode("fetching");
    })
    .catch(err => {console.log(err)})
  }, []);
 
  const handleOpen = () => {
    props.setShowModal(true);
  };

  const handleClose = () => {
    props.setShowModal(false);
  };

  return (
    

    
    <div>
    {console.log("what is showmodal: "+props.showModal)}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.modify}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.showModal}>
          <div className={classes.paper}>
            {mode==="fetching" && <p>Fetching related flights..</p>}
            {mode==="showing_results" && 
            <FlightResults 
              flights={searchResults} 
              onSelect={ flight => {
                props.setMode("modifying_booking")
                sendRequest("PUT", "https://localhost:8081/app/booking/update", props.token, {
                  bookingID: props.bookingID,
                  user:{email:props.userEmail},
                  payment:{
                    
                  }
                })
              }}/>
            }
            {mode==="modifying_booking" &&
              <div>Changing booking..</div>
            }
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
