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
import { Fragment, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress'
import {sendRequest} from "./../Utils/httpRequestMaker.js"

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="/home">
                FlightLogix
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}




async function registerUser(User) {

    return sendRequest("POST", "/app/register", null, JSON.stringify(User))
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
            console.error("Failed to Register user => " + err)
        })
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
        backgroundColor: "#F4B400",
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp(props) {
    const classes = useStyles();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastname] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isRegistering, setIsRegistering] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [error, setError] = useState(null);


    const handleRegister = async e => {
        e.preventDefault();
        setIsRegistering(true);
        setError(null);
        const response = await registerUser({
            firstName,
            lastName,
            email,
            password

        });

        setIsRegistering(false);

        if (!response) {
            console.log("Server unavailable");
            setError("Server unavailable. Try again later.");
        }
        else if (response['message']) {
            console.log(response['message']);
            setError(response['message']);
        }
        //nulll out setters
        else if(response === "CREATED") {
            console.log("Registration successful ");                      
            setIsRegistered(true)

        }
        else{
            console.log(response)
            console.log(response['title']);
            setError(response['title']);
        }

            setEmail()
            setFirstName()
            setLastname()
            setPassword()      

        

    }



    return (
       
        <Fragment>
            
            <Container maxWidth="xs" fixed disableGutters={true}>
                {
                    isRegistering && <div className={classes.paper}>
                        <CircularProgress />
                        <p>Registering User</p>

                    </div>
                }

                {!isRegistering &&
                    <div>
                        <CssBaseline />
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign up
        </Typography>
        {error && <Typography component="body2" style={{ color: 'red' }} variant="body2"><br />{error}</Typography>}

                            <form className={classes.form} onSubmit={handleRegister}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            autoComplete="fname"
                                            name="firstName"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="firstName"
                                            label="First Name"
                                            autoFocus
                                            onChange={e => setFirstName(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="lastName"
                                            label="Last Name"
                                            name="lastName"
                                            autoComplete="lname"
                                            onChange={e => setLastname(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            type="email"
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                            onChange={e => setPassword(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={<Checkbox value="allowExtraEmails" color="primary" />}
                                            label="I want to receive inspiration, marketing promotions and updates via email."
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    style={{backgroundColor:"#F4B400"}}
                                >
                                    Sign Up
          </Button>
                                <Grid container justify="flex-end">
                                    <Grid item>
                                        <Link href="#" variant="body2" onClick={props.closeHandler}>
                                            Already have an account? Sign in
              </Link>
                                    </Grid>
                                </Grid>
                            </form>
                        </div>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </div>
                }

                {isRegistered && props.handleIsRegistered('success')}
            </Container>

        </Fragment>
    );
}