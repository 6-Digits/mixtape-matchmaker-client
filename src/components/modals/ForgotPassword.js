import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Dialog, DialogActions, Button, Link, DialogContent, DialogContentText, DialogTitle, TextField} from '@material-ui/core';

const useStyles = makeStyles(() => ({
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
	dialog: {
		zIndex: 9999
	}
}));
  
const api = window.location.protocol+'//'+window.location.hostname+':42069/api';
const success = "A reset email has been sent to the designated email!";
const failure = "Failed to send an email either likely because the email does not exist in our database";

function ForgotPassword() {
	const [email, setEmail] = useState(null);
	const [open, setOpen] = useState(false);
	
	const handleSubmit = async () => {
		let requestOptions = {
			method: 'POST',
			headers: {'Content-Type': 'application/json' },
			body: JSON.stringify({"email":email})
		};
		let response = await fetch(api + '/auth/resetPassword', requestOptions);
		if (response.status == 200) {
			alert(success);
			handleClose();
		} else {
			alert(failure);
		}
	};

	const emailChange = (event) => {
		setEmail(event.target.value);
	};

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
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" className={classes.dialog}>
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
					onChange={emailChange}
				/>
				</DialogContent>
				<DialogActions>
				<Button onClick={handleClose} color="secondary" className={classes.button}
				variant="contained">
					Cancel
				</Button>
				<Button onClick={handleSubmit} color="primary" className={classes.button}
				variant="contained">
					Send Password Reset Email
				</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default ForgotPassword;