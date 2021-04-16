import React, { useState } from 'react';
import { useBorderSelectStyles } from '@mui-treasury/styles/select/border';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// Original design here: https://github.com/siriwatknp/mui-treasury/issues/541

const BorderSelect = () => {
  const [val, setVal] = useState(1);

  const handleChange = (event) => {
    setVal(event.target.value);
  };

  const borderSelectClasses = useBorderSelectStyles();

  // moves the menu below the select input
  const menuProps = {
    classes: {
      list: borderSelectClasses.list
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left"
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left"
    },
    getContentAnchorEl: null
  };

  const iconComponent = (props) => {
    return (
      <ExpandMoreIcon className={props.className + " " + borderSelectClasses.icon} />
    )
  };


  return (
    <FormControl>

      <Select style={{color:'#5f6368'}}
        disableUnderline
        labelId="inputLabel"
        IconComponent={iconComponent}
        MenuProps={menuProps}
        value={val}
        onChange={handleChange}
      >
        <MenuItem value={0} style={{color:'#5f6368'}}>
          <ListItem button>
            <ListItemIcon>
              <SyncAltIcon />
            </ListItemIcon>
            <ListItemText   primary="Round Trip" />
          </ListItem>
        </MenuItem>

        <MenuItem value={1} style={{color:'#5f6368'}}>
          <ListItem button>
            <ListItemIcon>
              <ArrowRightAltIcon />
            </ListItemIcon>
            <ListItemText primary="One Way" />
          </ListItem>
        </MenuItem>
      </Select>
    </FormControl>
  );
};


export default BorderSelect;


