import React, { useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TripTypeButton from './TripTypeMenu';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Fab from '@material-ui/core/Fab';
import IncrementPassengersButton from './PassengerNumber/IncrementButton';
import Location from './LocationInputBox';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import IconButton from '@material-ui/core/IconButton';
import DatePicker from './DatePicker';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import FlightResults from "./FlightResults"
import { useHistory } from 'react-router';
import {sendRequest} from "./../Utils/httpRequestMaker.js"


const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
  },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    margin:{
        marginTop: '5px'
    },

    arrow:{
        justifyContent : 'center'
    },
    button:{
        float: 'right',
        margin: theme.spacing(1),
        color: '#4285F4',
        

    }
}));

export default function SimpleCard(props) {
    const classes = useStyles();
    const [whereFrom, setWhereFrom] = useState();
    const [whereTo, setWhereTo] = useState();
    
    const [tripType, setTripType] = useState('Round Trip');
    const [departureDate, setDepartureDate] = useState("2021-05-31");
    const [returnDate, setReturnDate] = useState("2021-06-14");
    let history = useHistory()

    const searchFlights = async (Search) => {
        props.setIsSearching(true);
        props.setError();
        sendRequest("POST", "https://localhost:8081/app/booking/search",props.token, JSON.stringify(Search))
        .then(response => response.json())
        .then(responseJson =>{
            console.log("Received flight data: " + JSON.stringify(responseJson))
            var flights = responseJson["flights"]
            if(flights){
                var searchResults = [];
                for(var i = 0; i < flights.length; i++){
                    searchResults.push(flights[i])
                }
                props.searchResultSetter(searchResults);                
            }
            else{
                props.setError('No results found.')
            }
            
            props.setIsSearching(false);
        })
        .catch(err => {console.log(err)})
    }
    const searchHandler = () => {
        var search = {
            originLocationCode: whereFrom,
            destinationLocationCode: whereTo,
            departureDate: departureDate,
            returnDate: returnDate,
            numAdults: props.passengers,
            maxResults: 10
        }
        
        history.push('/search');
        searchFlights(search) ;
  
        
    }
    return (
        <Fragment>
            <Card className={classes.root} style={{raised: true}}>
                {console.log("where from: "+whereFrom+" where to"+whereTo)}
                <CardContent>
                    <Grid container className={classes.root} spacing={3}>

                        <Grid item xs={3}>
                            <TripTypeButton setTripType={setTripType} setReturnDate={setReturnDate} tripType={tripType} />
                        </Grid>

                        <Grid item xs={3}>
                            <IncrementPassengersButton  setPassengers={props.setPassengers} passengers={props.passengers}/>
                        </Grid>

                        </Grid>
                        <Grid container className={classes.root} spacing={3}>

                        <Grid item xs={3.5}>
                            <Location label="Where from?" location={setWhereFrom} val={whereFrom} />
                        </Grid>
                        <Grid item xs={3.75}>
                            <Location label="Where to?" location={setWhereTo} val={whereTo}/>
                        </Grid>

                        <Grid item xs={2} className ={classes.margin} >
                        <DatePicker label="Departure date" id="departureDate" defaultDate={departureDate} setter={setDepartureDate}/>
                        </Grid>
                        {tripType==='Round Trip' &&
                        <Grid item xs={3}  className ={classes.margin} >
                        <DatePicker label="Return Date" id="returnDate"  defaultDate={returnDate} setter={setReturnDate}/>
                        </Grid>
                         }
                    </Grid>
                    <Button    
                        className={classes.button}
                        endIcon={<SearchIcon/>}
                        onClick={searchHandler}
                    >
                      Search
                    </Button>
                </CardContent>
            </Card>
            
        </Fragment>
    );
}