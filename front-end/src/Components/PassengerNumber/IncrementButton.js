
import { Fragment } from 'react';
import Spinner from './InputSpinner';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';






export default function IncrementPassengersButton(props) {


    return (
        <Fragment>
            <PersonOutlineIcon size="small" style={{marginTop: '15px', marginRight: '10px', color:"#5f6368"}} />
            <Spinner setPassengers={props.setPassengers} passengers={props.passengers}/>
        </Fragment>

    );
};


