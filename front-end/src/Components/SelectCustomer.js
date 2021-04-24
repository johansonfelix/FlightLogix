import React from 'react';
import Typography from '@material-ui/core/Typography';
import UserSearchBar from './UserSearchBar';







export default function Review(props) {
 

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
      SELECT CUSTOMER
      </Typography>
      <UserSearchBar setOnBehalfOfUserEmail={props.setOnBehalfOfUserEmail} create={true} admin={true} />

    </React.Fragment>
  );
}