import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';



//The pop up will expand based on the size of 
export default function BookingReview() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
       Booking Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          Row 1 col 1

        </Grid>
        <Grid item xs={12} sm={6}>
     Row2 col2
        </Grid>
        <Grid item xs={12}>
        Some details here using typography component
        </Grid>
        <Grid item xs={12}>
        Some details here using typography component
        </Grid>
        <Grid item xs={12} sm={6}>
        Some details here using typography component
        </Grid>
        <Grid item xs={12} sm={6}>
        Some details here using typography component
        </Grid>
        <Grid item xs={12} sm={6}>
        Some details here using typography component
        </Grid>
        <Grid item xs={12} sm={6}>
        Some details here using typography component
        </Grid>
        <Grid item xs={12}>
          
        </Grid>
      </Grid>
    </React.Fragment>
  );
}