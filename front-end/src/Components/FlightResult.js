import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import Paper from '@material-ui/core/Paper';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    content: {
        marginTop: '40px',
        marginBottom: '40px',
        textAlign: 'center',
        display: 'block',


    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        alignContent: 'center'

    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    margin: {
        margin: '10px'
    },
    priceSection:{

/*     textAlign: 'center' */
    }
}));


export default function FlightResult(props) {
    const classes = useStyles();

    return (

        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={20} >
                <Grid className={classes.flightSection}item container direction="column" xs={10} >
                       
                            <Grid container spacing={2}>

                                <Grid item>
                                    <ButtonBase className={classes.image}>
                                        <img className={classes.img} alt="complex" src="https://daisycon.io/images/airline/?width=300&height=150&color=ffffff&iata=BA" />
                                    </ButtonBase>
                                </Grid>

                                <Grid item xs>
                                    <Grid item xs container direction="column" >
                                        <Grid item xs>
                                            <Typography gutterBottom variant="subtitle1">
                                                Sun, May 02
</Typography>
                                            <Typography variant="body2" gutterBottom>
                                                03:17pm YUL <ArrowForwardIcon /> 06:30am LHR
</Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                (with connecting flights)
</Typography>

                                        </Grid>

                                    </Grid>

                                </Grid>


                            </Grid>
                            <Divider className={classes.margin} variant="middle" />
                            <Grid container spacing={2}>

<Grid item>
    <ButtonBase className={classes.image}>
        <img className={classes.img} alt="complex" src="https://daisycon.io/images/airline/?width=300&height=150&color=ffffff&iata=BA" />
    </ButtonBase>
</Grid>

<Grid item xs>
    <Grid item xs container direction="column" >
        <Grid item xs>
            <Typography gutterBottom variant="subtitle1">
                Sun, May 02
</Typography>
            <Typography variant="body2" gutterBottom>
                03:17pm YUL <ArrowForwardIcon /> 06:30am LHR
</Typography>
            <Typography variant="body2" color="textSecondary">
                (with connecting flights)
</Typography>

        </Grid>

    </Grid>

</Grid>


</Grid>
                    </Grid>
                    <Divider orientation="vertical" flexItem />

                    <Grid alignContent="center" justify="center" className={classes.priceSection} item xs container direction="column">
                        <Grid item>

                            <Typography gutterBottom variant="h4">
                                $ 1382.90
</Typography>

                            <Button
                                variant="contained"
                                style={{ backgroundColor: '#ff4600', color: '#fff' }}
                                className={classes.button}
                                endIcon={<ArrowForwardIosIcon />}
                                square
                            >
                                Select
</Button>
                        </Grid>
                    </Grid>
                </Grid>



            </Paper>
        </div>

    );
}

