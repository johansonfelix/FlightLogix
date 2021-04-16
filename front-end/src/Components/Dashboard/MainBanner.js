import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


/* STYLES */
const useStyles = makeStyles((theme) => ({

    heading: {
        color: '#4285F4'
    },
    welcometext: {
        color: theme.palette.grey[800]
    },
    text: {
        color: theme.palette.grey[800]
    },
    banner: {
        display: 'flex',
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',

    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.1)',
    },
    bannerContent: {
        position: 'relative',
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(8),
            paddingRight: 0,
        },
    },
}));


export default function MainBanner(props) {
    const classes = useStyles();

    const { image } = props;
    return (

        <Paper className={classes.banner} style={{ backgroundImage: `url(${image.image})` }} elevation={0} square>
            <img style={{ display: 'none' }} alt="FlightLogix" />
            <div className={classes.overlay} />

            <Grid container>
                <Grid item md={6}>
                    <div className={classes.bannerContent}>
                        <Typography component="h1" variant="h3" color="primary" gutterBottom className={classes.heading}>
                            DASHBOARD
                        </Typography>

                        <Typography variant="h4" color="#DB4437" paragraph className={classes.welcometext}>
                            Welcome to Flight Logix
                        </Typography>

                        <Typography variant="h5" color="inherit" className={classes.text}>
                            Start planning your journey.
                        </Typography>                  
                    </div>
                </Grid>
            </Grid>

        </Paper>
    );

}