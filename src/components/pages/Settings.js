import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, ButtonBase, TextField, List, ListItem, ListItemText, Menu, MenuItem, Switch, Button, FormControlLabel, Card, CardMedia } from '@material-ui/core';
import NavigationBar from '../modules/NavigationBar';
import placeholder from "../../assets/placeholder.png";

const options = [
	'Male',
	'Female',
	'Other',
];

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	mainContainer: {
		padding: '5vh 20vh 10vh 20vh',
		display: "flex",
		justifyContent: "auto",
		width: "100%",
	},
	paperCard: {
		padding: theme.spacing(2),
		margin: 'auto',
		maxWidth: '100%',
		backgroundColor: theme.palette.background.default
	},
	card: {
		maxWidth: 300,
		maxHeight: 300,
		margin: theme.spacing(2),
	},
	cardMedia: {
		maxHeight: 300,
	},
	cardContent: {
		textAlign: "left",
	},
	cardAction: {
		display: 'block',
		maxWidth: 300,
		maxHeight: 300,
	},
	button: {
		fontWeight: 'bold'
	},
	name: {
		width:'50%'
	}
}));

const errorNoPassMatch = "The passwords that you have enter do not match!";
const errorCannotFetchData = "We cannot fetch the data from our database likely because you are not connected to the internet!";
const errorSignUp = "We could not update your account settings. Either the password is incorrect or the server is down. Please try again or contact support!";
const errorInvalidEmail = "The email that you have entered is not valid!";
const errorShortPass = "The password that you have entered should be at least 8 characters long!";
const errorMissing = "One or more of the fields above are empty!";
const errorAge = "You have to be at least 18 years of age or older to register";
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const api = 'http://localhost:42069/api';

function Settings(props) {
	const [anchorEl, setAnchorEl] = useState(null);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [displayName, setDisplayName] = useState(null);
	const [name, setName] = useState("Adam");
	const [birthdate, setBirthdate] = useState(null);
	const [gender, setGender] = useState(null);
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const [confirmPass, setConfirmPass] = useState(null);
	const [error, setError] = useState(false);
	const [errorMsg, setErrorMsg] = useState(null);

	const [state, setState] = useState({
		checkedNotifications: true,
	});


	const fetchUserProfile = async (userToken, user) => {
		let requestOptions = {
			method: 'GET',
			headers: {'Content-Type': 'application/json', 'x-access-token': userToken}
		};
		let response = await fetch(api + `/profile/id/${user._id}`, requestOptions);
		alert(response.status);
		alert(props.user._id);
		if(response.status == 200) {
			let data = await response.json();
			setName(data['name']);
			setDisplayName(data['username']);
			setBirthdate(data['dob'].substring(0, 10));
			options.forEach((genderOption, index) => {
				if(data['gender'] == genderOption) {
					setGender(index);
				}
			});
		} else {
			setError(true);
			setErrorMsg(errorCannotFetchData);
		}
	};

	function getAge(dateString) {
		var today = new Date();
		var birthDate = new Date(dateString);
		var age = today.getFullYear() - birthDate.getFullYear();
		var m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	}

	const saveUserSettings = async () => {
		let validEmail = emailRegex.test(String(email).toLowerCase());
		let valid = true;
		if(!validEmail) {
			valid=false;
			setError(true);
			setErrorMsg(errorInvalidEmail);
		} else if(password.length < 8) {
			valid=false;
			setError(true);
			setErrorMsg(errorShortPass);
		} else if(!name && !birthdate && !gender) {
			valid=false;
			setError(true);
			setErrorMsg(errorMissing);
		} else if(getAge(birthdate) < 18) {
			valid = false
			setError(true);
			setErrorMsg(errorAge);
		}
		if(valid){
			let userData = {
				name:name,
				dob: birthdate,
				gender: gender['title'],
				email: email,
				password: password
			}
			let requestOptions = {
				method: 'POST',
				headers: {'Content-Type': 'application/json' },
				body: JSON.stringify(userData)
			};
			let response = await fetch(api + '/auth/register', requestOptions);
			if (response.status == 200) {
				let data = await response.json();
				props.storeUser(data['token']);
				props.fetchUser(data['token']);
			} else {
				setError(true);
				setErrorMsg(errorSignUp);
			}
		}
	}

	useEffect(() => {
		// let userToken = JSON.parse(cookies.get('userToken'));
		// let userToken = cookies['userToken'];
		let userToken = localStorage.getItem('userToken');
		if(userToken && props.user){
			fetchUserProfile(userToken, props.user);
		} 
	  }, []);

	const displayNameChange = (event) => {
		setDisplayName(event.target.value);
		setError(false);
	};

	const nameChange = (event) => {
		setName(event.target.value);
		setError(false);
	};
	const birthChange = (event) => {
		setBirthdate(event.target.value);
		setError(false);
	};
	const genderChange = (event) => {
		setGender(event.target.value);
		setError(false);
	};
	const emailChange = (event) => {
		setEmail(event.target.value);
		setError(false);
	};
	const passChange = (event) => {
		setPassword(event.target.value);
		setError(false);
	};
	const confirmPassChange = (event) => {
		setConfirmPass(event.target.value);
		setError(false);
	};

	const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};

	const handleClickListItem = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuItemClick = (event, index) => {
		setSelectedIndex(index);
		setAnchorEl(null);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const classes = useStyles();
	return (
		<div className={classes.root}>
			<NavigationBar setUser={props.setUser} pageName='My Matches'></NavigationBar>
			
			<Paper className={classes.paper}>
				<Grid container spacing={3} className={classes.mainContainer}>
					<Grid item xs={12}>
						<Typography gutterBottom variant="h4">Public Profile</Typography>
					</Grid>
					<Grid item xs={12} sm={3}>
						<Card className={classes.card}>
							<input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
							<ButtonBase className={classes.cardAction}>
								<label htmlFor="icon-button-file">
									<CardMedia component='img' className={classes.cardMedia} image={placeholder} />
								</label>
							</ButtonBase>
						</Card>
					</Grid>
					<Grid item xs={12} sm={9}>
						<Paper className={classes.paperCard}>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="username"
								label="Display Name"
								name="username"
								value={displayName}
								onChange={displayNameChange}
								autoComplete="nickname"
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								id="name"
								label="Name"
								name="Name"
								value={name}
								onChange={nameChange}
								autoComplete="name"
								className={classes.name}
							/>
							<Typography gutterBottom variant="subtitle1">
								<form className={classes.container} noValidate>
									<TextField
										id="datetime-local"
										label="Birthday"
										type="date"
										value={birthdate}
										onChange={birthChange}
										className={classes.textField}
										InputLabelProps={{
											shrink: true,
										}}
									/>
								</form>
							</Typography>
							<List component="nav" aria-label="Gender Menu">
								<ListItem
									button
									aria-haspopup="true"
									aria-controls="gender-menu"
									aria-label="gender"
									onClick={handleClickListItem}
								>
									<ListItemText primary="Gender" secondary={options[selectedIndex]} />
								</ListItem>
							</List>
							<Menu
								id="gender-menu"
								anchorEl={anchorEl}
								keepMounted
								open={Boolean(anchorEl)}
								onClose={handleClose}
							>
								{options.map((option, index) => (
									<MenuItem
										key={option}
										selected={index === selectedIndex}
										onClick={(event) => handleMenuItemClick(event, index)}
									>
										{option}
									</MenuItem>
								))}
							</Menu>
						</Paper>
					</Grid>
					<Grid item xs={12}>
						<Typography gutterBottom variant="h4">Account Settings</Typography>
					</Grid>
					<Grid item xs>
					<Paper className={classes.paperCard}>
						<TextField
							variant="outlined"
							margin="normal"
							defaultValue="currentEmail@domain.com"
							required
							fullWidth
							id="email"
							label="Email"
							name="email"
							value={email}
							onChange={emailChange}
							autoComplete="email"
						/>
						<TextField
							variant="outlined"
							margin="normal"
							placeholder="empty if unchanged"
							fullWidth
							id="password"
							label="New Password"
							name="password"
							value={password}
							onChange={passChange}
							autoComplete="password"
						/>
						<TextField
							variant="outlined"
							margin="normal"
							placeholder="empty if unchanged"
							fullWidth
							id="confirmPassword"
							label="Confirm New Password"
							name="confirmPassword"
							value={confirmPass}
							onChange={confirmPassChange}
							autoComplete="confirmPassword"
						/>
						<FormControlLabel
							control={
								<Switch 
									checked={state.checkedNotifications} 
									onChange={handleChange} 
									name="checkedNotifications" 
									
									/>
							}
							label="Allow Notifications" labelPlacement="start"
						/>
					</Paper>
					</Grid>
				<Grid item xs={12}>
					<Typography gutterBottom variant="h4">Confirm Changes</Typography>
				</Grid>
				<Grid item xs={12}>
				<Paper className={classes.paperCard}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="confirmOldPassword"
						label="Confirm Old Password"
						name="confirmOldPassword"
						autoComplete="confirmOldPassword"
					/>
					</Paper>
				</Grid>
				<Grid item xl={12}>
					<Button size="large" color="primary" variant="contained" className={classes.button} onClick={saveUserSettings}>Save Changes</Button>
				</Grid>
				</Grid>
			</Paper>
		</div>
	);
}

export default Settings;