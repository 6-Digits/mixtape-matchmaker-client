import React, { useState, useEffect } from "react";
import {Button, TextField, FormControlLabel, Checkbox, Link, Grid, Container} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import logo from "../../assets/logo.png";
import { Redirect } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
	paper: {
	  marginTop: theme.spacing(8),
	  display: 'flex',
	  flexDirection: 'column',
	  alignItems: 'center',
	},
	container: {
		height: "100vh" ,
		
	},
	content: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "80vh" ,
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
	  }
  }));

function SignUp({user, setUser}) {
	let loginUser = () => {
		setUser({
			user: true
		});
		return <Redirect exact from="/signup" to={{ pathname: "/home" }} />;
	};
	const classes = useStyles();	
	return (
		<Container component="main" maxWidth="lg" className={classes.container}>
			<div className={classes.content}>
				<container>
					<img src={logo} className={classes.logo}/>
					<form className={classes.form} noValidate>
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
							autoComplete="lname"
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
						/>
						</Grid>
						<Grid item xs={12}>
						<TextField
							variant="outlined"
							required
							fullWidth
							name="confirm password"
							label="Confirm Password"
							type="confirm password"
							id="confirm-password"
							autoComplete="current-password"
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
						onClick= {loginUser}
					>
						Sign Up
					</Button>
					<Grid container justify="flex-start">
						<Grid item>
						<Link href="/login" variant="body2">
							Already have an account? Sign in
						</Link>
						</Grid>
					</Grid>
					</form>
				</container>
			</div>
		</Container>
	);
}

export default SignUp;