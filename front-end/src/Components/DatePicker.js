import {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({

});
export default  function DatePicker( props){
    const classes  = useStyles();
    const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));

    
const handleDateChange = (date) => {
    setSelectedDate(date);
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
      />


    );
}