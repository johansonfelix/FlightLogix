import {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles();
export default  function DatePicker(){
    const classes  = useStyles();
    const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));

    
const handleDateChange = (date) => {
    setSelectedDate(date);
  };

    return(
        <TextField
        id="date"
        label="Birthday"
        type="date"
        defaultValue="2017-05-24"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />


    );
}