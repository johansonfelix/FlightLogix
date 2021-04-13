import classes from './Header.module.css';
import DrawerToggle from './HeaderItems/DrawerToggle/DrawerToggle';
import Logo from './HeaderItems/Logo/Logo';
import UserIcon from './HeaderItems/UserIcon/UserIcon';

const Header = () => {
    return (
        <header className={classes.header}>
            <DrawerToggle/>
            <Logo className={classes.Logo} />
            <UserIcon />

        </header>


    );
};


export default Header;