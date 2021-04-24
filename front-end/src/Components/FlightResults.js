import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FlightResult from "./FlightResult.js"

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

export default function FlightResults(props) {
    const classes = useStyles();
    var flightJSXs = []
    var flights = props.flights

    for(var i = 0; i < flights.length; i++){
        let flight = flights[i];
        flightJSXs.push(<FlightResult flight={flight} onSelect={props.onSelect}/>)
    }

    return (
        <div className={classes.root}>
            {flightJSXs}
        </div>

    );
}

