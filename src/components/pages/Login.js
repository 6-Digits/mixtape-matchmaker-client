import React, { useState } from "react";
import { Button, TextField, Link, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import logo from "../../assets/logo.png";
import ForgotPassword from "../modals/ForgotPassword";
import IntroCarousel from "../modules/IntroCarousel";

const useStyles = makeStyles((theme) => ({
	form: {
		width: '100%'
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		fontWeight: "bold",
		fontFamily: "Arial Black"
	},
	headerButton: {
		fontSize: '2.5 rem'
	},
	content: {
		width: "100%",
		height: "100%"
	},
	logo: {
		display: "flex",
		margin: "auto",
		height: "25vh",
		width: "25vh"
	},
	container: {
		height: "100vh"
	},
	loginError: {
		color: theme.palette.error.main,
		fontSize: '1rem',
		textAlign: 'center',
		marginBottom: '1rem'
	},
	hook:{
		backgroundColor: theme.palette.background.default,
		width: "100%",
		height: "100%"
	},
	login: {
		padding: "0 1.5rem 0 1.5rem"
	}
}));

const api = window.location.protocol+'//'+window.location.hostname+':42069/api';

function Login({storeUser, fetchUser}) {
	const classes = useStyles();
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	//const [, setRemember] = useState(null);
	const [error, setError] = useState(false);
	const [errorMsg] = useState("We could not find your account with the given email/password.");

	const handleLogin = async (event) => {
		event.preventDefault();
		let requestOptions = {
			method: 'POST',
			headers: {'Content-Type': 'application/json' },
			body: JSON.stringify({"email":email, "password":password})
		};
		let response = await fetch(api + '/auth/login', requestOptions);
		if (response.status === 200) {
			let data = await response.json();
			// if(remember){
				storeUser(data['token']);
			// }
			fetchUser(data['token']);
		} else {
			setError(true);
		}
	};

	const changeEmail = (event) => {
		setEmail(event.target.value);
		setError(false);
	};

	const changePassword = (event) => {
		setPassword(event.target.value);
		setError(false);
	};

	
	return (
		<Grid container className={classes.container} fullWidth>
		<Grid xs={12} direction="row" justify="space-between" className={classes.content} container>
			<Grid item xs={8} className={classes.hook} container>
				<IntroCarousel/>
			</Grid>
			<Grid item xs={4} container className={classes.login}>
				<img src={logo} className={classes.logo}/>
				<form className={classes.form} onSubmit={handleLogin} noValidate>
				<TextField
				variant="outlined"
				margin="normal"
				required
				fullWidth
				id="email"
				label="Email Address"
				name="email"
				autoComplete="email"
				onChange={changeEmail}
				autoFocus
				/>
				<TextField
				variant="outlined"
				margin="normal"
				required
				fullWidth
				name="password"
				label="Password"
				type="password"
				id="password"
				onChange={changePassword}
				autoComplete="current-password"
				/>
				{/* <FormControlLabel
				control={<Checkbox value="remember" color="primary" />}
				label="Stay Logged In"
				onChange={changeRemember}
				/> */}
				<Button
				type="submit"
				fullWidth
				variant="contained"
				color="primary"
				className={classes.submit}
				value="submit"
				>
				Log In
				</Button>
					{error ? <div className={classes.loginError}>{errorMsg}</div> : null}
				<Grid 
				container
				direction="row"
				justify="space-between"
				alignItems="center">
					<ForgotPassword/>
					<Link href="/signup" variant="body2">
					{"Don't have an account? Sign Up"}
					</Link>
				</Grid>
			</form>
		  </Grid>
		</Grid>
		{/* <Footer></Footer> */}
	  </Grid>
	);
}

export default Login;