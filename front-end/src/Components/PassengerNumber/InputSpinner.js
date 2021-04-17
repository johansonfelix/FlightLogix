import "./InputSpinner.css";
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';


export default function TravellersNumber(props) {

  
    const decrease = () => {
        if (props.passengers >= 2)
            props.setPassengers(props.passengers - 1)
    }

    const increase = () => {
        if (props.passengers <= 4)
            props.setPassengers(props.passengers + 1)
    }
    
    return (

        <div class="number-input">
     
            <button onClick={decrease} ></button>
            <TextField InputProps={{ disableUnderline: true }} class="quantity" name="quantity" value={props.passengers} type="number" />
            <button onClick={increase} class="plus"></button>
        </div>
    );

}

