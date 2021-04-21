import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
//import airports from 'airport-codes'; 
import {airports} from './airports';


export default function Location(props) {
  

  
  const handleSelect = (event, value) =>{
    if(value){
      console.log(value.iata);   
      props.location(value.iata)   
    }
   
  }
  
  return (




    <div style={{ width: 300 }}>


<Autocomplete
      id="combo-box-demo"
      options={airports}
      style={{ width: 300 }}
      autoHighlight
      getOptionLabel={(option) =>option.iata+" "+option.name+" "+option.country+" "+option.city}
      renderOption={(option) => <Fragment>
        <div style={{display:'flex', position:'relative', alignItems:'center'}}>
 <p><strong>{option.iata}</strong> <br/>{option.name} {option.city} {option.country} </p>
 </div>
      </Fragment>
      }
      renderInput={(params) => <TextField {...params} value={props.val} label={props.label}variant="outlined" />}
      onChange={handleSelect}
    />
    </div>
  );
}
