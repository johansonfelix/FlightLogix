import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { NavLink } from 'react-router-dom';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import BallotIcon from '@material-ui/icons/Ballot';
import SettingsIcon from '@material-ui/icons/Settings';
import FeedbackIcon from '@material-ui/icons/Feedback';
import HelpIcon from '@material-ui/icons/Help';
import classes from './MainNavigation.module.css';



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

    <NavLink to='/viewusers'  activeStyle={{
    fontWeight: "bold",
    color: "#F4B400",
    textDecoration: 'none'
  }}>
    <ListItem button>
      <ListItemIcon>
        <AccountBoxIcon />
      </ListItemIcon>
      <ListItemText primary="Customer Bookings" />
    </ListItem>
    </NavLink>

    <NavLink to='/search' activeStyle={{
    fontWeight: "bold",
    color: "#F4B400",
    textDecoration: 'none'
  }}>   

    <ListItem button>
      <ListItemIcon>
        <BallotIcon />
      </ListItemIcon>
      <ListItemText primary="Flight Search" />
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