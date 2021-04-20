import React, { useCallback, useEffect, Fragment } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress'

import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs';
import Registration from '../Pages/Registration';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

var httpRequestMaker = require("./../Utils/httpRequestMaker.js")



async function loginUser(Credentials) {

    return httpRequestMaker.sendRequest("POST", "https://localhost:8081/app/login", null, JSON.stringify(Credentials))
        .then((response) => response.json())
        .then((responseJson) => {

            /* console.log("Received: " + JSON.stringify(responseJson))
           let tokenReceived = responseJson['token']
           console.log("Using token: " + tokenReceived)
           console.log("STATE TOKEN:" + props.token)
 
           if (tokenReceived){
               props.setToken(tokenReceived) */

            return responseJson


        })

        .catch(err => {
            console.error("Failed to log in user => " + err)
        })
}

const Fade = React.forwardRef(function Fade(props, ref) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
            if (open && onEnter) {
                onEnter();
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited();
            }
        },
    });



    return (
        <animated.div ref={ref} style={style} {...other}>
            {children}
        </animated.div>
    );
});

Fade.propTypes = {
    children: PropTypes.element,
    in: PropTypes.bool.isRequired,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
};

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="/">
                FlightLogix
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalPaper: {
        display: 'flex',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        alignItems: 'center',
        justifyContent: 'center',
    },


}

));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function SignIn(props) {
    const classes = useStyles();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
  


    const handleRegistrationOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
          }
      
          setSnackBarOpen(false);
        };
      
        const handleIsRegistered = variant => {
            console.log('in handle is registered')
            setSnackBarOpen(true);
            handleClose();


        }


        const handleSubmit = async e => {
            console.log("Clicked login.")
            e.preventDefault();

            setIsAuthenticating(true);
            setError(null);
            const response = await loginUser({
                email,
                password,
                setIsAuthenticating
            });

            if (!response) {
                console.log("Server unavailable");
                setError("Server unavailable. Try again later.");
            }
            else if (response['message']) {
                console.log(response['message']);
                setError(response['message']);
            }
            else if (response['token']) {
                console.log(response)
                props.setToken(response);
            }

            setIsAuthenticating(false);




        }






        return (
        
                <Fragment>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />

                        {!isAuthenticating &&
                            <div className={classes.paper}>

                                <Avatar className={classes.avatar}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Sign in
        </Typography>
                                {error && <Typography component="body2" style={{ color: 'red' }} variant="body2"><br />{error}</Typography>}

                                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        type="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        onChange={e => setEmail(e.target.value)}
                                        autoFocus
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox value="remember" color="primary" />}
                                        label="Remember me"
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                       
                                    >
                                        Sign In
          </Button>
                                    <Grid container>

                                        <Grid>
                                            <Link href="#" variant="body2" onClick={handleRegistrationOpen}>
                                                <Typography >
                                                    Don't have an account? Sign Up
        </Typography>

                                            </Link>
                                        </Grid>
                                    </Grid>
                                </form>

                                <Box mt={8}>
                                    <Copyright />
                                </Box>
                            </div>
                        }
                        {isAuthenticating &&
                            <div className={classes.paper}>
                                <CircularProgress />
                                <p>Authenticating</p>

                            </div>
                        }

                    </Container>

                    <Container maxWidth="xs" fixed disableGutters={true}>
                        <Modal
                            aria-labelledby="spring-modal-title"
                            aria-describedby="spring-modal-description"
                            className={classes.modalPaper}
                            open={open}
                            onClose={handleClose}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 600,
                            }}
                        >
                            <Fade in={open}>
                                <div className={classes.modalPaper}>

                                    <Registration handleIsRegistered={handleIsRegistered} closeHandler={handleClose} />

                                </div>
                            </Fade>
                        </Modal>

                        <Snackbar open={snackBarOpen} autoHideDuration={5000} onClose={handleSnackBarClose}>
                            <Alert onClose={handleSnackBarClose} severity="success">
                                User Account Created!
        </Alert>
                        </Snackbar>

                    </Container>


                </Fragment>

               );
    }