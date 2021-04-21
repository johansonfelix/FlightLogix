import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import BookingDetails from './BookingDetails';
import OrderReview from './OrderReview';
import PayPalButton from './PayPalButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useState } from 'react';


/* import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
 */

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Review Booking Details', 'Pay with Paypal'];



export default function MakeBookingManager(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);



  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <BookingDetails selectedFlight={props.selectedFlight} passengers={props.passengers}/>;
      case 1:
        return <OrderReview selectedFlight={props.selectedFlight} passengers={props.passengers}/>;   
      default:
        throw new Error('Unknown step');
    }
  }
  return (
    <React.Fragment>
      
       
      
      <main className={classes.layout}>
       {console.log('paymentConfirmed: '+ paymentConfirmed) }
        <Paper className={classes.paper}>

  {!paymentConfirmed &&
  <div>          <Typography component="h1" variant="h4" align="center">
            Make Booking
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="subtitle1">
                 Oops. Something went wrong. Try again later.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button  onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                   {activeStep === steps.length - 1 ? <PayPalButton onClick={handleNext}selectedFlight={props.selectedFlight} priceTotal={props.selectedFlight.price.total} token={props.token} paymentConfirmed={setPaymentConfirmed}/>:
                     <Button
                     variant="contained"
                     color="primary"
                     onClick={handleNext}
                     className={classes.button}
                   >
                   Next 
                   </Button>}
                  
            
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
          </div>
}
{paymentConfirmed &&
  <div className={classes.paper}>
 
 <Typography variant="h5" gutterBottom>
                 Confirmation
                </Typography>
                <Typography variant="subtitle1">
                  Your booking has been made. We have emailed you your booking confirmation. You can view your booking in My Bookings.
                </Typography>

</div>
}
        </Paper>

      </main>
    </React.Fragment>
  );
}