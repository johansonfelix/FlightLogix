import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import {sendRequest, tokenDecoder } from '../Utils/httpRequestMaker';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function Asynchronous(props) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const token = localStorage.getItem('token');



  

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await sendRequest("GET", "https://localhost:8081/app/admin/allbookings", token, null)
     
      const bookings = await response.json();
      const allbookings = await bookings;
     

      if (active) {
        setOptions(Object.keys(allbookings).map((key) => allbookings[key].bookingID));
      }
      
    })();
    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const handleSelect = async (event, value) =>{
  
    
    if(value){        
        const response = await sendRequest("GET", "https://localhost:8081/app/admin/get/"+value, token, null)
     
        const booking = await response.json();
        const thebooking = await booking;       

        console.log('set show booking: '+JSON.stringify(booking))
        props.setShowBooking(true) 
        props.setBooking(booking) 
        
    }
    else{
        props.setShowBooking(false)
    }
    
  }

  return (
    <Autocomplete
      id="asynchronous-demo"
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
        
          {...params}
          label="Search by booking number"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
      onInputChange={handleSelect}
    />
  );
}