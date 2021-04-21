import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import flightParser from '../Utils/flightParser';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import UserSearchBar from './UserSearchBar';


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
      SELECT CUSTOMER
      </Typography>
      <UserSearchBar setCustomerEmail={props.setCustomerEmail} admin={true} />

    </React.Fragment>
  );
}