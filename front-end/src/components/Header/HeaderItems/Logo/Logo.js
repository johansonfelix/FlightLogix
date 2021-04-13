import classes from '../Logo/Logo.module.css';
import flightLogixLogo from '../../../../assets/logo.png';


const Logo = () => {
    return(
    <div className={classes.Logo}>
        <img src={flightLogixLogo} alt="FlightLogix" />
    </div>

    );
};


export default Logo;