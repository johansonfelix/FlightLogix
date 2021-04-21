import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
var flightParser = require("./../Utils/flightParser")

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: '10px'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

export default function DetailedAccordion(props) {   
  const classes = useStyles();
  let booking = props.booking

  return (
    <div className={classes.root}>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography variant="h6" className={classes.heading} >Booking# {booking.id}</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}> {flightParser.getFirstOutboundLeg(booking.flight).from.iatacode} <ArrowForwardIcon/> {flightParser.getLastOutboundLeg(booking.flight).to.iatacode} {booking.flight.flightType==="ONE_WAY"?"(One way)":"(Round Trip)"} </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <div className={classes.column} />
          <div className={classes.column}>
          <Typography variant="caption">
            Carrier: IMAGE GOES HERE
            Departure: {flightParser.getFirstOutboundLeg(booking.flight).from.time} | Terminal {flightParser.getFirstOutboundLeg(booking.flight).from.terminal}
            Arrival: {flightParser.getLastOutboundLeg(booking.flight).to.time} | Terminal {flightParser.getLastOutboundLeg(booking.flight).to.terminal}

            </Typography>
          </div>
          <div className={clsx(classes.column, classes.helper)}>
            <Typography variant="caption">
              $ {booking.flight.price.total} (add number of tickets purchased)
              <br />
              
            </Typography>
          </div>
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button size="small" style={{color:'#4285F4'}}  onClick={props.setModify} startIcon={<EditIcon/>}>Modify Booking</Button>
          <Button size="small" style={{color:'#DB4437'}} startIcon={<CancelIcon/>}>Cancel Booking</Button>
          
        </AccordionActions>
      </Accordion>
    </div>
  );
}

