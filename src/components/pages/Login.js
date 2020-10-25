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
		},
		headerButton: {
			fontSize: 2.5	 + 'rem'
		},
		container: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			height: "100vh" ,
			
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
		<div>
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
			  Sign In
			</Button>
			<Grid container>
			  <Grid item xs>
				<Link href="#" variant="body2">
				  Forgot password?
				</Link>
			  </Grid>
			  <Grid item>
				<Link href="#" variant="body2">
				  {"Don't have an account? Sign Up"}
				</Link>
			  </Grid>
			</Grid>
		  </form>
		</div>
	  </Container>
	);
}

export default Login;