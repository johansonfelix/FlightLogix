import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import flightParser from '../Utils/flightParser';



//insert booking details here (modify)
const booking =   { type: 'One ', desc: 'YUL to YYZ', price: '$9.99' };



const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Booking summary
      </Typography>
      <List disablePadding>
     
          <ListItem className={classes.listItem} key={booking.name}>
            <ListItemText primary={props.selectedFlight.flightType==="ONE_WAY"?"One Way":"Round trip"} secondary={flightParser.getFirstOutboundLeg(props.selectedFlight).from.iatacode + " to " + flightParser.getLastOutboundLeg(props.selectedFlight).to.iatacode} />
            <Typography variant="body2">{props.selectedFlight.price.total * props.passengers}</Typography>
          </ListItem>
    
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
   
            
          <Typography variant="subtitle1" className={classes.total}>
            {props.selectedFlight.price.total * props.passengers}
          </Typography>
        </ListItem>
      </List>
   

    </React.Fragment>
  );
}