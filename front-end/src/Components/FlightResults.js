import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import Paper from '@material-ui/core/Paper';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
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

