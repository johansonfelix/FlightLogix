import {React, useState, useEffect} from 'react';
import {sendRequest} from "./../Utils/httpRequestMaker"
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';



export default function TransitionsModal(props) {
  const [mode, setMode] = useState("deleting")

  useEffect(() => {
    sendRequest("DELETE", props.isAdmin===false?"/app/booking/cancel/"+ props.booking.bookingID:"/app/admin/cancel/" + props.booking.bookingID,props.token, null)
    .then(response => response.json())
    .then(responseJson=>{
        console.log("Delete result response:" + JSON.stringify(responseJson))
        if(responseJson === "OK"){
            console.log("Setting to delete successful to show the delete modal")
            setMode("delete_successful")
        }
    })
    .catch(err => {console.log(err)})
     }, [props.booking.bookingID, props.isAdmin, props.token]);
 
 
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
            {mode==="delete_successful" && <div><p>Delete successful.</p>{window.location.reload(false)}</div>}
            </DialogContentText>

</DialogContent>

</Dialog>
  
      
    
    </div>
  );
}
