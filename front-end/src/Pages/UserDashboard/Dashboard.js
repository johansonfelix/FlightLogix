import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import FlightSearchCard from '../../Components/FlightSearchCard';
import { mainListItems, secondaryListItems } from './listitems';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import PropTypes from 'prop-types';
import MainBanner from './MainBanner';
import dashImage from '../../assets/flights_3.svg';
import logo from '../../assets/logo.svg';
import Button from '@material-ui/core/Button';
import FlightResults from '../../Components/FlightResults';
import { Route, useHistory } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import MakeBooking from '../../Components/MakeBooking';
import MyBookings from '../../Pages/MyBookings';
import { sendRequest } from "../../Utils/httpRequestMaker";
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';


import UserAccount from '../UserAccount';

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
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        height: '100vh',
        overflow: 'hidden'

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
        height: '100vh'

    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: 'auto',
        overflow: 'auto',
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
    spinner: {
        marginLeft: "500px",
        marginTop: theme.spacing(8),
        display: 'block',
        alignSelf: 'center',
        justifyContent: 'center',
        color: "#F4B400",

    },
    bar: {
        position: 'relative',
        backgroundColor: '#4285F4',
    }

}));



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
  


export default function Dashboard(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [searchResults, setSearchResults] = useState();
    const [progress, setProgress] = React.useState(0);
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState();
    const [isMakingBooking, setIsMakingBooking] = useState(false);
    const [selectedFlight, setSelectedFlight] = useState()
    const [passengers, setPassengers] = useState(1);
   
    let history = useHistory();

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 800);

        return () => {
            clearInterval(timer);
        };
    }, []);



    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const clearTokenServerSide = async () => {
        sendRequest("POST", "/app/logout", props.token, null)
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
     
        try {
            clearTokenServerSide();
            // if(success){
            props.setToken(undefined)
            clearTokenClientSide();
            // }

        }
        catch (err) {
            console.error(err)
        }
    };


    const [doOpen, setDoOpen] = React.useState(true);
    const[showUser, setShowUser] = useState(true);



    const handleClickClose = () => {

        history.push('/home');
    };

     
let searchCard = <FlightSearchCard token={props.token} searchResultSetter={setSearchResults} passengers={passengers} setPassengers={setPassengers} setIsSearching={setIsSearching} setError={setError} />;
    return (


        <div className={classes.root}>

            <CssBaseline />
            <ElevationScroll {...props}>
                <AppBar position="fixed"
                    className={clsx(classes.appBar, { [classes.appBarShift]: open, })}>
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
                        <Divider orientation="vertical" flexItem className={clsx(classes.menuButton, open && classes.menuButtonHidden)} />
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <img src={logo} alt="FlightLogixLogo" className={classes.logo} />
                            </Grid>
                            <Grid item xs={6}>
                                <Button style={{ color: '#4285F4', margin: '15px', float: 'right' }} href="/" onClick={handleLogout}>Logout</Button>
                            </Grid>
                        </Grid>



                    </Toolbar>
                </AppBar>
            </ElevationScroll>

            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}>

                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>

                <Divider />
                <List>{mainListItems}</List>
                <Divider style={{ marginTop: '100px' }} />
                <List >{secondaryListItems}</List>
            </Drawer>

            <main className={classes.content}>
                <Route path="/home" exact>
                    
                    <MainBanner image={image} className={classes.banner} />
                


                <Container maxWidth="lg" className={classes.container}>
                   
                    {searchCard}
</Container>

</Route>

<Container maxWidth="lg" className={classes.container}>



                    <Route path="/search">

                    {searchCard}
                    {isSearching &&
                        <div className={classes.container}>
                            <LinearProgress style={{ backgroundColor: "#DB4437" }} />
                            <LinearProgress style={{ backgroundColor: "#F4B400" }} />
                            <Typography variant="body1" color="textSecondary" align='center'>Searching </Typography>
                        </div>
                    }
                    {error &&
                        <div className={classes.container}>  <Typography variant="body1" color="textSecondary" align='center'>{error} </Typography></div>
                    }

                        {!isSearching && !error &&
                            <div className={classes.container}>

                                {searchResults !== undefined &&
                                    <div>
                                        <FlightResults flights={searchResults} onSelect={(flight) => {
                                            setIsMakingBooking(true)
                                            setSelectedFlight(flight)
                                        }} />

                                        {
                                            isMakingBooking && <MakeBooking stateSetter={setIsMakingBooking} state={isMakingBooking} selectedFlight={selectedFlight} passengers={passengers} token={props.token} />
                                        }

                                    </div>

                                }

                            </div>
                        }

                    </Route>

                    <Route path="/mybookings">
                        <div>
                            
                            <div>
                              
                                <Dialog fullScreen open={doOpen} onClose={handleClickClose} TransitionComponent={Transition}>
                                    <AppBar className={classes.bar}>
                                        <Toolbar>
                                            <IconButton edge="start" color="inherit" onClick={handleClickClose} aria-label="close">
                                                <CloseIcon />
                                            </IconButton>
                                            <Typography variant="h6" className={classes.title}>
                                                My Bookings
            </Typography>

                                        </Toolbar>
                                    </AppBar>
                                    <MyBookings token={props.token} isAdmin={false} />
                                </Dialog>
                            </div>

                        </div>
                    </Route>



                    <Route path = "/myaccount">
                    
    
    <UserAccount showUser={showUser} setShowUser={setShowUser}/>
                    </Route>
                </Container>
            </main>
        </div>

    );
}


