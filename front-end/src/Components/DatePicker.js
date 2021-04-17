import {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({

});
export default  function DatePicker(props){
    const classes  = useStyles();
  

    
const handleDateChange = (date) => {
  console.log('today date: '+new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate())
    console.log("DATE SELECTED: "+date.target.value);
    props.setter(date);
  };

    return(
        <TextField
        id={props.id}
        label={props.label}
        type="date"
        defaultValue={props.defaultDate}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleDateChange}
      />


    );
}