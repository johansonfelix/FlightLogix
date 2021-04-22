import {React, Fragment, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import {tokenDecoder, sendRequest} from "./../Utils/httpRequestMaker"
import Booking from "../Components/BookingCard"
import CircularProgress from '@material-ui/core/CircularProgress';
import ModifyModal from '../Components/ModifyModal';
import BookingCard from "./../Components/BookingCard"
import DeleteModal from "../Components/DeleteModal"


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',  
    
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

export default function DetailedAccordion(props) {   
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true)
  const [bookingCards, setBookingCards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState()


  useEffect(() => {
    let user = tokenDecoder(props.token)
    sendRequest("GET", props.onBehalfOfUserEmail===undefined?"https://localhost:8081/app/booking/get_bookings/" + user.sub:"https://localhost:8081/app/admin/get-all-bookings/" +  props.onBehalfOfUserEmail, props.token, null)
    .then(response => response.json())
    .then(responseJson => {
      console.log(JSON.stringify(responseJson))
      let bookings = responseJson
      console.log(bookings.length + " is the length")
      for(let i = 0; i < bookings.length; i++){
        let booking = bookings[i]
        bookingCards.push(
        <BookingCard 
          booking={booking}
          setSelectedBooking={setSelectedBooking}
          setShowModal={setShowModal}
          setShowDeleteModal={setShowDeleteModal}
          />)
      }
      setIsLoading(false)
    })
    .catch(err => {console.error(err)})
  }, []);
    
  return (
    <Fragment>
       <div className={classes.root}>

      {!isLoading && <div>{bookingCards}</div>}
      {isLoading && <div> <Typography variant="body1" color="textSecondary" align='center'>One Moment, fetching your bookings.</Typography></div>}

      {showModal && 
      <div>
        {console.log('in the condition')}
        <ModifyModal token={props.token} booking={selectedBooking} showModal={showModal} setShowModal={setShowModal} isAdmin={props.onBehalfOfUserEmail!==undefined} />

      </div>
      }
      {
        showDeleteModal &&
        <div>
           {console.log("Showing delete modal..")}
           <DeleteModal token={props.token} booking={selectedBooking} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} isAdmin={props.onBehalfOfUserEmail!==undefined}/>
        </div>
      }
      </div>
    </Fragment>
    
  );
}


