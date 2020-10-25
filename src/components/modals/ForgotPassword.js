import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Dialog, DialogActions, Button, Link, DialogContent, DialogContentText, DialogTitle, TextField, Grid} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	// modal: {
	// 	position: 'absolute',
	// 	width: '25%',
	// 	// height: '40vh',
	// 	backgroundColor: theme.palette.background.paper,
	// 	border: '2px solid #000',
	// 	padding: theme.spacing(2, 4, 3),
	// 	top: `${50}%`,
	// 	left: `${50}%`,
	// 	transform: `translate(-${50}%, -${50}%)`,
	// },
	// button: {
	// 	fontWeight: "bold"
	// },
	// link: {
	// }
}));
  
function ForgotPassword(props) {
	const [open, setOpen] = React.useState(false);
  
	const handleOpen = () => {
	  setOpen(true);
	};
  
	const handleClose = () => {
	  setOpen(false);
	};
  const classes = useStyles();
	
	return (
		<div>
			<Link href="#" color="primary" onClick={handleOpen}>
				Forgot your password?
			</Link>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title" >Enter an email address</DialogTitle>
				<DialogContent>
				<DialogContentText>
					Please enter the email of a valid account and wait up to 5 minutes for a password reset email.
				</DialogContentText>
				
				<TextField
					autoFocus
					margin="dense"
					id="forgot-email"
					label="Email Address"
					type="email"
					fullWidth
				/>
				</DialogContent>
				<DialogActions>
				<Button onClick={handleClose} color="primary" className={classes.button}>
					Cancel
				</Button>
				<Button onClick={handleClose} color="primary" className={classes.button}>
					Send Password Reset Email
				</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default ForgotPassword;