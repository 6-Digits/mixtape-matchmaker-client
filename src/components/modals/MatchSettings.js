import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Dialog, DialogActions, Button, Link, DialogContent, DialogContentText, DialogTitle, TextField} from '@material-ui/core';
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
    ageInput: {
        marginLeft: '0.5rem'
    }
}));
  
function MatchSettings(props) {
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
            <Button className={classes.button} onClick={handleOpen} variant="contained" fullWidth color="inherit">{"Match Settings"}</Button>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title" variant="">My Match Settings</DialogTitle>
				<DialogContent>
                    <Autocomplete
                        required
                        id="gender"
                        options={[
                            {title: "Female"}, 
                            {title: "Male"}, 
                            {title: "Other" }
                        ]}
                        getOptionLabel={(option) => option.title}
                        fullWidth
                        autoComplete="sex"
                        renderInput={(params) => <TextField {...params} label="Gender Preference" variant="outlined" />}
                        />
                    <DialogContentText>
                        My Age Preference:
                        <TextField
                            autoFocus
                            margin="normal"
                            id="age-lower"
                            label="Youngest"
                            type="number"
                            className={classes.ageInput}
                        />
                        <TextField
                            autoFocus
                            margin="normal"
                            id="age-upper"
                            label="Oldest"
                            type="number"
                            className={classes.ageInput}
                        />
                    </DialogContentText>
				</DialogContent>
				<DialogActions>
				<Button onClick={handleClose} color="secondary" className={classes.cancel}>
					Cancel
				</Button>
				<Button onClick={handleClose} color="primary" className={classes.save}>
					Send Password Reset Email
				</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default MatchSettings;