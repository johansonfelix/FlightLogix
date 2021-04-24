import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import {sendRequest } from '../Utils/httpRequestMaker';

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
      const response = await sendRequest("GET", "/app/admin/allcustomers", token, null)
     
      const customers = await response.json();
      const allcustomers = await customers;
      console.log(allcustomers);

      if (active) {
        setOptions(Object.keys(customers).map((key) => allcustomers[key].email));
      }
      
    })();
    return () => {
      active = false;
    };
  }, [loading, token]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const handleSelect = async (event, value) =>{
    let email;
  

    console.log("EMAIL TO SET: " + value)
    props.setOnBehalfOfUserEmail(value);
    if(props.create)
      return;
      
    email = value

    
    if(email){   
      
      
        const response = await sendRequest("GET", "/app/admin/get-all-bookings/"+value, token, null)
     
        const bookings = await response.json();
        const thebookings = await bookings;       

        console.log('set show booking: '+JSON.stringify(thebookings))
        if(bookings)
        props.setBookings(bookings) 
        props.setShowBookings(true) 
       
        
    }
    else{
        props.setShowBookings(false)  
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
          label="Search by customer email"
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