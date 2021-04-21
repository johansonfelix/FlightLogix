import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import { useGutterBorderedGridStyles } from '@mui-treasury/styles/grid/gutterBordered';
import { useHistory } from 'react-router';
import cx from 'clsx';

const user = {
    email: 'test@email.com', firstName: 'John', lastName: 'Doe'
}
const useStyles = makeStyles(({ palette }) => ({
    card: {
      borderRadius: 12,
      minWidth: 256,
      textAlign: 'center',
    },
    avatar: {
      width: 60,
      height: 60,
      margin: 'auto',
    },
    heading: {
      fontSize: 18,
      fontWeight: 'bold',
      letterSpacing: '0.5px',
      marginTop: 8,
      marginBottom: 0,
    },
    subheader: {
      fontSize: 14,
      color: palette.grey[500],
      marginBottom: '0.875em',
    },
    statLabel: {
      fontSize: 12,
      color: palette.grey[500],
      fontWeight: 500,
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      margin: 0,
    },
    statValue: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 4,
      letterSpacing: '1px',
    },
  }));


function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const styles = useStyles();
  const shadowStyles = useFadedShadowStyles();
  const borderedGridStyles = useGutterBorderedGridStyles({
    borderColor: 'rgba(0, 0, 0, 0.08)',
    height: '50%',
  });

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">My Account</DialogTitle>
      
      <Card className={cx(styles.card, shadowStyles.root)}>
      <CardContent>
        <Avatar className={styles.avatar} src={'https://i.pravatar.cc/300'} />
        <h3 className={styles.heading}>{user.firstName+" "+user.lastName}</h3>
        <span className={styles.subheader}>{user.email}</span>
      </CardContent>
      <Divider light />
      <Box display={'flex'}>
        <Box p={2} flex={'auto'} className={borderedGridStyles.item}>
          <p className={styles.statLabel}>Joined date</p>
          <p className={styles.statValue}>21/04/2021</p>
        </Box>
        <Box p={2} flex={'auto'} className={borderedGridStyles.item}>
          <p className={styles.statLabel}>Status</p>
          <p className={styles.statValue}>Active</p>
        </Box>
      </Box>
    </Card>
         
      

    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo(props) {
    let history = useHistory();


  const handleClickOpen = () => {
    props.setShowUser(true);
  };

  const handleClose = (value) => {
    history.push('/');
   
  };

  return (
    <div>
     
      <SimpleDialog  open={props.showUser} onClose={handleClose} />
    </div>
  );
}