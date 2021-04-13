import classes from './UserIcon.module.css';
import {Icon} from '@iconify/react';
import userCircle from '@iconify-icons/fa/user-circle';

const UserIcon = () => {
    return(

        <div className={classes.icon}>
            <Icon className={classes.icon}icon={userCircle} />
        </div>

    );
};


export default UserIcon;