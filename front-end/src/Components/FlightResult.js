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
import { useHistory } from 'react-router';


var flightParser = require("./../Utils/flightParser")
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    content: {
        marginTop: '40px',
        marginBottom: '40px',
        textAlign: 'center',
        display: 'block',
    },
    paper: {
        padding: theme.spacing(2),
        margin: '10px',
        alignContent: 'center'

    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    margin: {
        margin: '10px'
    },
    priceSection:{

/*     textAlign: 'center' */
    }
}));
function parseDate(timestamp){
    return timestamp.split("T")[0]
}
function parseTime(timestamp){
    var garbage = timestamp.split("T")[1]
    return garbage.split("Z")[0]
}
export default function FlightResult(props) {
    const classes = useStyles();
    let flight = props.flight;
    let oneWay = flight["flightType"]==="ONE_WAY"?true:false
    let directFlightOutbound = flightParser.getOutboundLegs(flight).length===1?true:false;
    let from = flightParser.getFirstOutboundLeg(flight).from;
    let to = flightParser.getLastOutboundLeg(flight).to;
    let fromIatacode = from.iatacode;
    let toIatacode = to.iatacode;
    let fromDate = parseDate(from.time)
    let fromTime = parseTime(from.time)
    let toDate = parseDate(to.time)
    let toTime = parseTime(to.time)
    let price = flight.price.total
    let returnFrom = null;
    let returnTo = null;
    let returnFromDate = null;
    let returnFromTime = null;
    let returnToTime = null;
    let returnToDate = null;
    let carrierCodeOutbound = flightParser.getFirstOutboundLeg(flight).carrierCode;
    let carrierOutboundImageURL = "https://daisycon.io/images/airline/?width=300&height=150&color=ffffff&iata=" + carrierCodeOutbound;
    let directFlightInbound = null;
    let carrierCodeInbound = null;
    if(!oneWay){
        returnFrom = flightParser.getFirstInboundLeg(flight).from
        returnTo = flightParser.getLastInboundLeg(flight).to
        returnFromDate = parseDate(returnFrom.time)
        returnFromTime = parseTime(returnFrom.time)
        returnToDate = parseDate(returnTo.time)
        returnToTime = parseTime(returnTo.time)
        directFlightInbound = flightParser.getInboundLegs(flight).length===1?true:false;
        carrierCodeInbound = flightParser.getFirstInboundLeg(flight).carrierCode;
    }
    let carrierInboundImageURL = "https://daisycon.io/images/airline/?width=300&height=150&color=ffffff&iata=" + carrierCodeInbound;

    return (
        <Paper className={classes.paper}>
            <Grid container spacing={20} >
                <Grid className={classes.flightSection}item container direction="column" xs={10} >
                    <Grid container spacing={2}>
                        <Grid item>
                            <ButtonBase className={classes.image}>
                                <img className={classes.img} alt="complex" src={carrierOutboundImageURL}/>
                            </ButtonBase>
                        </Grid>
                        <Grid item xs>
                            <Grid item xs container direction="column" >
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1">
                                        {fromDate}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        {fromTime} {fromIatacode} <ArrowForwardIcon /> {toTime} {toIatacode}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {directFlightOutbound && "(direct flight)"}{!directFlightOutbound && "(with connecting flights)"}
                                    </Typography>

                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    {!oneWay && 
                        <Divider className={classes.margin} variant="middle" />
                    }
                    {!oneWay && 
                    <Grid container spacing={2}>
                        <Grid item>
                            <ButtonBase className={classes.image}>
                                <img className={classes.img} alt="complex" src={carrierInboundImageURL} />
                            </ButtonBase>
                            </Grid>
                        <Grid item xs>
                            <Grid item xs container direction="column" >
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1">
                                        {returnFromDate}
                                            </Typography>
                                                <Typography variant="body2" gutterBottom>
                                                 {returnFromTime} {toIatacode} <ArrowForwardIcon /> {returnToTime} {fromIatacode}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                    {directFlightInbound && "(direct flight)"}{!directFlightInbound && "(connecting flight)"}
                                            </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    }
                    </Grid>
                    <Divider orientation="vertical" flexItem />
                    <Grid alignContent="center" justify="center" className={classes.priceSection} item xs container direction="column">
                        <Grid item>
                            <Typography gutterBottom variant="h4">
                                $ {price}  <Typography  align= 'center' variant="body2" color="textSecondary">
                               (per passenger)
                            </Typography>

                            </Typography>
                            
                        <Button
                            variant="contained"
                            style={{ backgroundColor: '#ff4600', color: '#fff' }}
                            className={classes.button}
                            endIcon={<ArrowForwardIosIcon />}
                            square
                            onClick={()=>{
                                props.onSelect(flight)
                            }}
                        >
                            Select
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}

