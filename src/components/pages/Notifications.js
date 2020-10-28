import React, { useState, useEffect } from "react";
import Sidebar from '../navbar/Sidebar';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Notification from '../modules/Notification';

const useStyles = makeStyles((theme) => ({
	root: {
	  width: '100%',
	  '& > * + *': {
		marginTop: theme.spacing(2),
	  },
	},
  }));


function Notifications(props) {
	const classes = useStyles();
	return (
		<div>
			<Sidebar pageName='Notifications'></Sidebar>
			<Notification message='Hello There'></Notification>
			<Notification link='http://localhost:8080/matches' message='JSON has sent you a message!'></Notification>
			<Notification link='http://localhost:8080/settings' message='FARHAN has matched with you!'></Notification>
			<Notification link='http://localhost:8080/myplaylists' message='DARREN has commented on your playlist!'></Notification>
		</div>
	);
}

export default Notifications;