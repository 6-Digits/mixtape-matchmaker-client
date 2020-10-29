import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { IconButton, Badge } from '@material-ui/core';
import { Notifications as NotificationsIcon } from '@material-ui/icons';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Notification from '../modules/Notification';


const options = [
  <Notification link='http://localhost:8080/matches' message='JSON has sent you a message!'></Notification>,
  <Notification link='http://localhost:8080/settings' message='FARHAN has matched with you!'></Notification>,
  <Notification link='http://localhost:8080/myplaylists' message='DARREN has commented on your playlist!'></Notification>
];

const ITEM_HEIGHT = 48;

export default function Notifications() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props) => (
    <Menu
      id="long-menu"
      anchorEl={anchorEl}
      keepMounted
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: {
          maxHeight: ITEM_HEIGHT * 4.5,
          width: '25%',
        },
      }}
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Badge badgeContent={17} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <StyledMenu>
        {options.map((option) => (
          <MenuItem key={option} selected={option === 'Pyxis'}>
            {option}
          </MenuItem>
        ))}
      </StyledMenu>
    </div>
  );
}