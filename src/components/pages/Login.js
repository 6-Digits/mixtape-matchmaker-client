import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import logo from "../../assets/logo.png";

function Login(props) {
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
			fontSize: 2.5	 + 'rem'
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
		logo: {
			display: "flex",
			margin: "auto",
			height: "25vh",
			width: "25vh"
		}
	  }));
	const classes = useStyles();
	return (
		<Container component="main" maxWidth="lg" className={classes.container}>
		<div className={classes.content}>
			<container>
				<img src={logo} className={classes.logo}/>
				<form className={classes.form} noValidate>
				<TextField
				variant="outlined"
				margin="normal"
				required
				fullWidth
				id="email"
				label="Email Address"
				name="email"
				autoComplete="email"
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
				autoComplete="current-password"
				/>
				<FormControlLabel
				control={<Checkbox value="remember" color="primary" />}
				label="Remember me"
				/>
				<Button
				type="submit"
				fullWidth
				variant="contained"
				color="primary"
				className={classes.submit}
				>
				Log In
				</Button>
				<Grid 
				container
				direction="row"
				justify="space-between"
				alignItems="center">
					<Link href="forgotpassword" variant="body2">
					Forgot password?
					</Link>
					<Link href="/signup" variant="body2">
					{"Don't have an account? Sign Up"}
					</Link>
				</Grid>
			</form>
		  </container>
		</div>
	  </Container>
	);
}

export default Login;