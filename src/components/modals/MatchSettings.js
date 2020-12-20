import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogActions, Button, DialogContent, DialogTitle, TextField, Typography, Grid } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
	container: {
		width:"100%",
		height:"100%"
	},
	button: {
		margin: theme.spacing(3, 0, 2),
		fontWeight: "bold",
		fontFamily: "Arial Black",
		fontSize: "1.5rem",
		backgroundColor: theme.palette.background.default,
		color: theme.palette.text.primary
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
	},
	error: {
		textAlign: 'center',
		fontSize: '1rem',
		color: theme.palette.error.main,
		marginBottom: '1rem'
	},
	save: {
		fontWeight: 'bold'
	}
}));
  
const errorFetch = "We failed to get your match settings. This is likely because either the server is down or you are disconnected from the internet.";
const errorDefault = "We could not saving your match settings likely because you are offline or Google's servers are down. Please try again later";
const errorGender = "You do not have a valid gender preference, please select a valid gender preference!";
const errorAge = "The age preference you have entered is either not in the valid (18 or older) range or unspecified. Please enter a valid age range!";
const errorLocation = "The location you have entered is too long (128 character limit) or does not exist!";

const api = window.location.protocol+'//'+window.location.hostname+':42069';

const genderOptions = [
	{title: "Male"},
	{title: "Female"},
	{title: "Other" },
	{title: "No Preference"},
];

function MatchSettings(props) {
	const classes = useStyles();
	const [genderPreference, setGenderPreference] = useState("Other");
	const [ageLower, setAgeLower] = useState(18);
	const [ageUpper, setAgeUpper] = useState(100);
	const [location, setLocation] = useState("New York City");
	const [error, setError] = useState(false);
	const [errorMsg, setErrorMsg] = useState();

	const [open, setOpen] = useState(false);
  
	useEffect(() => {
		if(open){
			fetchPreferences();
			setError(false);
		}
	}, [open]);

	const fetchPreferences = async() => {
		let userToken = localStorage.getItem('userToken');
		if (userToken) {
			let requestOptions = {
				method: 'GET',
				headers: {'Content-Type': 'application/json', 'x-access-token': userToken}
			};
			let response = await fetch(api + `/match/id/${props.user._id}`, requestOptions);
			if(response.status === 200) {
				let data = await response.json();
				genderOptions.forEach((genderOption) => {
					if (data['gender'].toLowerCase() === genderOption['title'].toLowerCase()) {
						setGenderPreference(genderOption);
					}
				});
				setAgeLower(data['ageLower'] ? data['ageLower'] : 18);
				setAgeUpper(data['ageUpper'] ? data['ageUpper'] : 100);
				setLocation(data['location'] ? data['location'] : '');
			} else {
				setError(true);
				setErrorMsg(errorFetch);
			}
		}
	};

	const saveMatchSettings = async() => {
		let userToken = localStorage.getItem('userToken');
		if (!genderPreference) {
			setError(true);
			setErrorMsg(errorGender);
		} 
		else if (ageLower < 18 || ageLower > ageUpper) {
			setError(true);
			setErrorMsg(errorAge);
		} 
		else if (ageUpper < 18 || ageUpper > 2147483647) {
			setError(true);
			setErrorMsg(errorAge);
		} 
		else if (location.length < 1 || location.length > 128) {
			setError(true);
			setErrorMsg(errorLocation);
		} 
		else if (!error){
			let geocodeResponse = await fetch(`${api}/match/geocode/${location}`, {
				method: 'GET',
				headers: {'Content-Type': 'application/json'}
			});
			if (geocodeResponse.status === 200 || geocodeResponse.status === 400) {
				let geocode = geocodeResponse.status === 200 ? await geocodeResponse.json() : {geocode:[0.0,0.0]};
				
				let userData = {
					gender: genderPreference['title'],
					ageUpper: ageUpper,
					ageLower: ageLower,
					location: location,
					...geocode
				};
				let requestOptions = {
					method: 'POST',
					headers: {'Content-Type': 'application/json', 'x-access-token': userToken },
					body: JSON.stringify(userData)
				};
				let response = await fetch(`${api}/match/preference/uid/${props.user._id}`, requestOptions);
				if (response.status === 200) {
					setError(false);
					handleClose();
				} else {
					setError(true);
					setErrorMsg(errorDefault);
				}
			}
			else {
				setError(true);
				setErrorMsg(errorLocation);
			}
			
		}
	};

	const handleOpen = () => {
		setOpen(true);
	};
  
	const handleClose = () => {
		setOpen(false);
	};
	
	const changeAgeLower = (event) => {
		setAgeLower(event.target.value);
		setError(false);
	}

	const changeAgeUpper = (event) => {
		setAgeUpper(event.target.value);
		setError(false);
	}

	const changeGenderPreference = (event, value) => {
		setGenderPreference(value);
		setError(false);
	}

	const changeLocation = (event) => {
		setLocation(event.target.value);
		setError(false);
	}

	return (
		<div className={classes.container}>
			<Button className={classes.button} onClick={handleOpen} variant="contained" fullWidth>{"Match Settings"}</Button>
			<Dialog 
				fullWidth={true}
				maxWidth="lg" className={classes.modal} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle disableTypography  id="form-dialog-title" className={classes.modalTitle}>My Match Settings</DialogTitle>
				<DialogContent>
					{/* <Typography variant="h6" className={classes.sectionHeader}>Match Preferences</Typography> */}
					<Autocomplete
						required
						id="gender"
						options={genderOptions}
						value={genderPreference}
						onChange={changeGenderPreference}
						getOptionLabel={(option) => option.title}
						fullWidth
						autoComplete="sex"
						renderInput={(params) => <TextField {...params} label="Gender Preference" variant="outlined" />}
						/>
					<Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>
						<Grid item xs={12} sm={2}>
							<Typography variant="h6">Age Preference:</Typography>
						</Grid>
						<Grid item xs={12} sm={2}>
							<TextField
								autoFocus
								margin="normal"
								id="age-lower"
								label="Youngest Age"
								type="number"
								value={ageLower}
								onChange={changeAgeLower}
								className={classes.input}
							/>
						</Grid>
						<Grid item xs={12} sm={2}>
							<TextField
								autoFocus
								margin="normal"
								id="age-upper"
								label="Oldest Age"
								value={ageUpper}
								onChange={changeAgeUpper}
								type="number"
								className={classes.input}
								style={{marginLeft:"1rem"}}
							/>
						</Grid>
					</Grid>
					{/* <Typography variant="h6" className={classes.sectionHeader, classes.profileHeader}>My Location</Typography> */}
					<TextField
						autoFocus
						margin="normal"
						id="location"
						label="Location"
						type="text"
						fullWidth
						value={location}
						onChange={changeLocation}
						className={classes.input}
					/>
					{/* <TextField
						autoFocus
						margin="normal"
						id="profile"
						label="Profile Description"
						type="text"
						fullWidth
						value={description}
						onChange={changeDescription}
						rows={5}
						multiline={true}
						className={classes.input}
					/> */}
					{error ? <div className={classes.error}>{errorMsg}</div> : null}
				</DialogContent>
				<DialogActions>
				<Button variant="contained" onClick={handleClose} color="secondary" className={classes.cancel}>
					Cancel
				</Button>
				<Button variant="contained" onClick={saveMatchSettings} color="primary" className={classes.save}>
					Save Match Preferences
				</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default MatchSettings;