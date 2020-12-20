import React, { useState } from "react";
import {Button, TextField, Link, Grid} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import logo from "../../assets/logo.png";
import IntroCarousel from "../modules/IntroCarousel";

const api = process.env.REACT_APP_API_SERVER;

const useStyles = makeStyles((theme) => ({
	hook:{
		backgroundColor: theme.palette.background.default,
		width: "100%",
		height: "100%"
	},
	signup: {
		padding: "0 1.5rem 0 1.5rem"
	},
	paper: {
	  marginTop: theme.spacing(8),
	  display: 'flex',
	  flexDirection: 'column',
	  alignItems: 'center',
	},
	content: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	avatar: {
	  margin: theme.spacing(1),
	  backgroundColor: theme.palette.secondary.main,
	},
	form: {
	  width: '100%', // Fix IE 11 issue.
	  marginTop: theme.spacing(3),
	},
	logo: {
		display: "flex",
		margin: "auto",
		height: "25vh",
		width: "25vh"
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		fontWeight: "bold",
		fontFamily: "Arial Black"
	},
	container: {
		height: "100vh"
	},
	loginError: {
		color: theme.palette.error.main,
		fontSize: '1rem',
		textAlign: 'center',
		marginBottom: '1rem'
	}
}));

const errorNoPassMatch = "The passwords that you have enter do not match!";
const errorSignUp = "We could not sign up your account with the given email/password. Please use a different email or contact support!";
const errorInvalidEmail = "The email that you have entered is not valid or is too long (320 characters)!";
const errorShortPass = "The password that you have entered should be at least 8 characters long or is too long (100 characters)!";
const errorMissing = "One or more of the fields above are empty!";
const errorAge = "You have to be at least 18 years of age or older to register";
const errorName = "The names you have entered is either blank or too long (100 characters)!";
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function SignUp({storeUser, fetchUser}) {
	const [firstName, setFirstName] = useState(null);
	const [lastName, setLastName] = useState(null);
	const [birthdate, setBirthdate] = useState("2000-01-01");
	const [gender, setGender] = useState(null);
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const [confirmPass, setConfirmPass] = useState(null);
	const [error, setError] = useState(false);
	const [errorMsg, setErrorMsg] = useState(errorSignUp);

	function getAge(dateString) {
		let today = new Date();
		let birthDate = new Date(dateString);
		let age = today.getFullYear() - birthDate.getFullYear();
		let m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	}

	const handleSignUp = async (event) => {
		event.preventDefault();
		let validEmail = emailRegex.test(String(email).toLowerCase());
		let valid = true;
		if(!validEmail || email.length > 320) {
			valid=false;
			setError(true);
			setErrorMsg(errorInvalidEmail);
		} else if(password.length < 8 || password.length > 100) {
			valid=false;
			setError(true);
			setErrorMsg(errorShortPass);
		} else if(confirmPass !== password) {
			valid=false;
			setError(true);
			setErrorMsg(errorNoPassMatch);
		} else if(!firstName || !lastName || !birthdate || !gender) {
			valid=false;
			setError(true);
			setErrorMsg(errorMissing);
		} else if(firstName.length > 100 || lastName.length > 100) {
			valid=false;
			setError(true);
			setErrorMsg(errorName);
		} else if(getAge(birthdate) < 18) {
			valid = false
			setError(true);
			setErrorMsg(errorAge);
		}
		if(valid){	
			let userData = {
				firstName: firstName,
				lastName: lastName,
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
			let response = await fetch(api + '/account/register', requestOptions);
			if (response.status === 200) {
				let data = await response.json();
				storeUser(data['token']);
				fetchUser(data['token']);
			} else {
				setError(true);
				setErrorMsg(errorSignUp);
			}
		}
	};

	const firstNameChange = (event) => {
		setFirstName(event.target.value);
		setError(false);
	};
	const lastNameChange = (event) => {
		setLastName(event.target.value);
		setError(false);
	};
	const birthChange = (event) => {
		setBirthdate(event.target.value);
		setError(false);
	};
	const genderChange = (event, value) => {
		setGender(value);
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

	const classes = useStyles();
	return (
		<Grid container className={classes.container} fullWidth>
		<Grid xs={12} direction="row" justify="space-between" className={classes.content} container>
			<Grid item xs={8} className={classes.hook} container>
				<IntroCarousel/>
			</Grid>
			<Grid item xs={4} container className={classes.signup}>
				<img src={logo} className={classes.logo} alt="" />
				<form className={classes.form} onSubmit={handleSignUp} noValidate>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<TextField
							autoComplete="fname"
							name="firstName"
							variant="outlined"
							required
							fullWidth
							id="firstName"
							label="First Name"
							onChange={firstNameChange}
							autoFocus
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							variant="outlined"
							required
							fullWidth
							id="lastName"
							label="Last Name"
							name="lastName"
							onChange={lastNameChange}
							autoComplete="lname"
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							autoComplete="bday"
							name="firstName"
							variant="outlined"
							type="date"
							required
							fullWidth
							id="birthdate"
							label="Birth Date"
							value={birthdate}
							onChange={birthChange}
							autoFocus
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Autocomplete
							required
							id="combo-box-demo"
							options={[
							{title: "Male"}, 
							{title: "Female"},
							{title: "Other" }
							]}
							getOptionLabel={(option) => option.title}
							fullWidth
							autoComplete="sex"
							renderInput={(params) => <TextField {...params} label="Gender" variant="outlined" />}
							onChange={genderChange}
							/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							variant="outlined"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							onChange={emailChange}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							variant="outlined"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							onChange={passChange}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							variant="outlined"
							required
							fullWidth
							name="confirm password"
							label="Confirm Password"
							type="password"
							id="confirm-password"
							autoComplete="current-password"
							onChange={confirmPassChange}
						/>
					</Grid>
					{/* <Grid item xs={12}>
					<FormControlLabel
						control={<Checkbox value="allowExtraEmails" color="primary" />}
						label="I want to receive inspiration, marketing promotions and updates via email."
					/>
					</Grid> */}
				</Grid>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					className={classes.submit}
				>
					Sign Up
				</Button>
				{error ? <div className={classes.loginError}>{errorMsg}</div> : null}
				<Grid container justify="flex-start">
					<Grid item>
					<Link href="/login" variant="body2">
						Already have an account? Sign in
					</Link>
					</Grid>
				</Grid>
				</form>
			</Grid>
		</Grid>
		{/* <Footer></Footer> */}
	  </Grid>
	);
}

export default SignUp;