import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/core';
import logo from '../assets/logo.svg';

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
const useStyles = makeStyles( {

 appBar: {
        backgroundColor: '#fff'
 },
 logo: {
    justifyContent: 'center',
    width: '200px',
    maxWidth: '50%',
}}
);
export default function ElevateAppBar(props) {
    const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar position="fixed" className={classes.appBar}>
           <Toolbar className={classes.toolbar}>
                           
                            <img src={logo} alt="FlightLogixLogo" noWrap className={classes.logo} />
                            </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      
    </React.Fragment>
  );
}
