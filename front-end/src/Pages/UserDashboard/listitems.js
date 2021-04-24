import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { NavLink } from 'react-router-dom';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import BallotIcon from '@material-ui/icons/Ballot';
import SettingsIcon from '@material-ui/icons/Settings';
import FeedbackIcon from '@material-ui/icons/Feedback';
import HelpIcon from '@material-ui/icons/Help';


export const mainListItems = (

  <div>
   
    <NavLink to='/home'  activeStyle={{
    fontWeight: "bold",
    color: "#F4B400",
    textDecoration: 'none'
  }}>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    </NavLink>

    <NavLink to='/myaccount'  activeStyle={{
    fontWeight: "bold",
    color: "#F4B400",
    textDecoration: 'none'
  }}>
    <ListItem button>
      <ListItemIcon>
        <AccountBoxIcon />
      </ListItemIcon>
      <ListItemText primary="My Account" />
    </ListItem>
    </NavLink>

    <NavLink to='/search' activeStyle={{
    fontWeight: "bold",
    color: "#F4B400",
    textDecoration: 'none'
  }}>
    <ListItem button>
      <ListItemIcon>
        <FlightTakeoffIcon />
      </ListItemIcon>
      <ListItemText primary="Search" />
    </ListItem>
    </NavLink>

    <NavLink to='/mybookings' activeStyle={{
    fontWeight: "bold",
    color: "#F4B400",
    textDecoration: 'none'
  }}>
    <ListItem button>
      <ListItemIcon>
        <BallotIcon />
      </ListItemIcon>
      <ListItemText primary="My Bookings" />
    </ListItem>
    </NavLink>
   
  </div>
);

export const secondaryListItems = (
  <div >
   
    <ListItem button>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Travel Settings" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <FeedbackIcon />
      </ListItemIcon>
      <ListItemText primary="Feedback" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <HelpIcon />
      </ListItemIcon>
      <ListItemText primary="Help" />
    </ListItem>
  </div>
);