import {React, useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {tokenDecoder, sendRequest} from "./../Utils/httpRequestMaker"
import FlightResults from './FlightResults';
import {todaysDate} from "./../Utils/General"
var flightParser = require("./../Utils/flightParser")

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionsModal(props) {
  const classes = useStyles();
  const [mode, setMode] = useState("deleting")

  useEffect(() => {
    sendRequest("DELETE", props.isAdmin===undefined?"https://localhost:8081/app/booking/cancel/"+ props.booking.bookingID:"https://localhost:8081/app/admin/cancel/" + props.booking.bookingID,props.token, null)
    .then(response => response.json())
    .then(responseJson=>{
        console.log("Delete result response:" + JSON.stringify(responseJson))
        if(responseJson === "OK"){
            console.log("Setting to delete successful to show the delete modal")
            setMode("delete_successful")
        }
    })
    .catch(err => {console.log(err)})
     }, []);
 
  const handleOpen = () => {
    props.setShowDeleteModal(true);
  };

  const handleClose = () => {
    props.setShowDeleteModal(false);
  };

  return (
    <div>
    {console.log("what is showmodal DELETE: "+props.showDeleteModal)}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.showDeleteModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.showDeleteModal}>
          <div className={classes.paper}>
            {mode==="deleting" && <p>Deleting booking..</p>}
            {mode==="delete_successful" && <p>Delete successful.</p>}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
