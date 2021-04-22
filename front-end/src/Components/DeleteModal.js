import {React, useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {tokenDecoder, sendRequest} from "./../Utils/httpRequestMaker"
import FlightResults from './FlightResults';
import {todaysDate} from "./../Utils/General";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { useHistory } from 'react-router';


var flightParser = require("./../Utils/flightParser")

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

export default function TransitionsModal(props) {
  const history = useHistory();
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
     
<Dialog
        open={props.showDeleteModal}
       
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
<DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
        
            {mode==="deleting" && <p>Deleting booking..</p>}
            {mode==="delete_successful" && <div><p>Delete successful.</p> {history.push("/")}</div>}
            </DialogContentText>

</DialogContent>

</Dialog>
  
      
    
    </div>
  );
}
