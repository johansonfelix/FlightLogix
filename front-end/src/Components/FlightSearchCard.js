import React, { useState } from 'react';
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

export default function SimpleCard() {
    const classes = useStyles();
    const [whereFrom, setWhereFrom] = useState();
    const [whereTo, setWhereTo] = useState();
    const [passengers, setPassengers] = useState (1);
    const [tripType, setTripType] = useState('Round Trip');
    const [arrivalDate, setArrivalDate] = useState(new Date().toISOString().substring(0, 10));
    const [departureDate, setDepartureDate] = useState(new Date().toISOString().substring(0, 10));


    return (
        
        <Card className={classes.root} style={{raised: true}}>
            {console.log("where from: "+whereFrom+" where to"+whereTo)}
            <CardContent>
                <Grid container className={classes.root} spacing={3}>

                    <Grid item xs={3}>
                        <TripTypeButton setTripType={setTripType} tripType={tripType} />
                    </Grid>

                    <Grid item xs={3}>
                        <IncrementPassengersButton  setPassengers={setPassengers} passengers={passengers}/>
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
                    <DatePicker label="Arrival Date" date={arrivalDate} setter={setArrivalDate}/>
                    </Grid>
                    {tripType==='Round Trip' &&
                    <Grid item xs={3}  className ={classes.margin} date={departureDate} setter={setDepartureDate}>
                       <DatePicker label="Departure Date" />
                    </Grid>
}
                </Grid>


                <Button
       
        
        className={classes.button}
        endIcon={<SearchIcon/>}
      >
          Search
          
        
      </Button>

     
            </CardContent>
     
        </Card>
    );
}