import React, { Fragment } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import FlightSearchCard from '../FlightSearchCard';
import { mainListItems, secondaryListItems } from './listitems';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import PropTypes from 'prop-types';
import MainBanner from './MainBanner';
import dashImage from '../../assets/flights_3.svg';
import logo from '../../assets/logo.svg';
import httpRequestMaker from '../../Utils/httpRequestMaker';




function ElevationScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const image = {
    image: dashImage,
};

const drawerWidth = 240;

/**
 * STYLES
 */
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        backgroundColor: '#fff',
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        color: '#5f6368',
        marginTop: '5px',
        marginRight: '10px',

    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        // overflow: 'auto',
        marginTop: '60px'
    },
    container: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    logo: {
        justifyContent: 'center',
        width: '200px',
        maxWidth: '50%',
    },
    hamburger: {
        marginRight: 0
    },
    avatar: {
        float: 'right',
    },

}));


export default function Dashboard(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const clearTokenServerSide = async () => {
        httpRequestMaker.sendRequest("POST", "https://localhost:8081/app/logout", props.token, null)
        .then(response => response.json())
        .then(responseJson => {
            console.log("Server reply:" + JSON.stringify(responseJson))
        })
        .catch(err => {
            console.error(err)
        })
    }
    const clearTokenClientSide = () => {
        localStorage.clear("token")
    }
    const handleLogout = () => {
        let success;
        try{
            success = clearTokenServerSide();
            // if(success){
                props.setToken(undefined)
                clearTokenClientSide();
            // }

        }
        catch(err){
            console.error(err)
        }
    };


    return (
        <Fragment>

            <div className={classes.root}>
                <button onClick={handleLogout}></button>
                <CssBaseline />
                <ElevationScroll {...props}>
                    <AppBar position="fixed"
                        className={clsx(classes.appBar, {[classes.appBarShift]: open,})}>
                        <Toolbar className={classes.toolbar}>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                            >
                                <MenuIcon marginRight={0} />
                            </IconButton>
                            <Divider orientation="vertical" flexItem className={clsx(classes.menuButton, open && classes.menuButtonHidden)}/>
                            <img src={logo} alt="FlightLogixLogo" noWrap className={classes.logo} />

                            {/*   <IconButton color="#5f6368" className={classes.avatar}>
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}

                        </Toolbar>
                    </AppBar>
                </ElevationScroll>

                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),}}
                    open={open}>

                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>

                    <Divider />
                    <List>{mainListItems}</List>
                    <Divider />
                    <List>{secondaryListItems}</List>
                </Drawer>

                <main className={classes.content}>
                    
                    <MainBanner image={image} className={classes.banner} />
                    <Container maxWidth="lg" className={classes.container}>
                        <FlightSearchCard token={props.token} />
                    </Container>
                </main>

            </div>
        </Fragment>
    );
}


