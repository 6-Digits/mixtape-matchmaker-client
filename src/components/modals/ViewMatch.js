import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Avatar, Dialog, DialogActions, Button, Link, DialogContent, DialogContentText, DialogTitle, TextField, Typography, Grid} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
	container: {
        width:"100%",
        height:"100%"
    },
    button: {
		margin: theme.spacing(3, 0, 2),
		fontWeight: "bold",
		fontFamily: "Arial Black",
		fontSize: "1.5rem"
    },
    input: {
        marginTop: 0
    },
    sectionHeader: {
        marginBottom: "0.5rem"
    },
    profileHeader: {
        marginTop: "1rem"
    },
    imgUpload: {
        width: '40%'
    },
    profileImg: {
        width: '20vh',
        height: '20vh'
    },
    modal: {
    },
    modalTitle: {
        fontSize: "2rem",
        fontWeight: "bold"
    }
}));
  
function ViewMatch(props) {
	const [open, setOpen] = React.useState(false);
  
	const handleOpen = () => {
	  setOpen(true);
	};
  
	const handleClose = () => {
	  setOpen(false);
	};
  const classes = useStyles();
	
	return (
		<div className={classes.container}>
            <Button className={classes.button} onClick={handleOpen} variant="contained" fullWidth color="primary">{"View Matches"}</Button>
            <Dialog 
                fullWidth={true}
                maxWidth="lg" className={classes.modal} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle disableTypography  id="form-dialog-title" className={classes.modalTitle}>View Matches</DialogTitle>
				<DialogContent>
                  <Grid>

                  </Grid>
				</DialogContent>
				<DialogActions>
				<Button variant="contained" onClick={handleClose} color="secondary" className={classes.cancel}>
					Exit
				</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default ViewMatch;