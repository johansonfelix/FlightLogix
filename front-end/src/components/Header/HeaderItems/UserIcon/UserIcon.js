import classes from './UserIcon.module.css';
import usericon from '../../../../assets/user.png';

const UserIcon = () => {
    return(

        <div className={classes.icon}>
            <img src={usericon} alt="user" />
        </div>

    );
};


export default UserIcon;