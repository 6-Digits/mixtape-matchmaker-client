import React, { useState, useEffect } from "react";
import {Button, TextField, FormControlLabel, Checkbox, Link, Grid, Container} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import logo from "../../assets/logo.png";
import { Redirect } from 'react-router-dom'
import Footer from "../navbar/Footer";

const useStyles = makeStyles((theme) => ({
	paper: {
	  marginTop: theme.spacing(8),
	  display: 'flex',
	  flexDirection: 'column',
	  alignItems: 'center',
	},
	content: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "90vh" ,
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
	  }
  }));

function SignUp({user, setUser}) {
	const [signup, setSignUp] = useState({

	});
	const classes = useStyles();	
	return (
		<Container component="main" maxWidth="lg" className={classes.container}>
			<div className={classes.content}>
				<Container>
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
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="bday"
								name="firstName"
								variant="outlined"
								type="date"
								defaultValue="1999-01-01"
								required
								fullWidth
								id="birthdate"
								label="Birth Date"
								autoFocus
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Autocomplete
							 required
							 id="combo-box-demo"
							 options={[
								 	{title: "Female"}, 
									{title: "Male"}, 
									{title: "Other" }
								]}
							 getOptionLabel={(option) => option.title}
							 fullWidth
							 autoComplete="sex"
							 renderInput={(params) => <TextField {...params} label="Gender" variant="outlined" />}
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
						href="/home"
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
				</Container>
			</div>
			<Footer></Footer>
		</Container>
	);
}

export default SignUp;