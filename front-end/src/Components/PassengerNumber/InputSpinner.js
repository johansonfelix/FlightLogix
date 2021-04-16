import "./InputSpinner.css";
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';


export default function TravellersNumber() {

    const [passengers, setPassengers] = useState(1);

    const decrease = () => {
        if (passengers >= 2)
            setPassengers(passengers - 1)
    }

    const increase = () => {
        if (passengers <= 4)
            setPassengers(passengers + 1)
    }
    
    return (

        <div class="number-input">
            {console.log(passengers)}
            <button onClick={decrease} ></button>
            <TextField InputProps={{ disableUnderline: true }} class="quantity" name="quantity" value={passengers} type="number" />
            <button onClick={increase} class="plus"></button>
        </div>
    );

}

