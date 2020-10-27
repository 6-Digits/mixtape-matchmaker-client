import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Redirect} from 'react-router-dom';
import "./App.css";
import Login from "./components/pages/Login";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import SignUp from "./components/pages/SignUp";
import MyPlaylist from "./components/pages/MyPlaylists";
import Matches from "./components/pages/Matches";
import Settings from "./components/pages/Settings";
import Notifications from "./components/pages/Notifications";
import {Paper, BottomNavigation, Grid, Button, Link} from '@material-ui/core';
import {createMuiTheme, ThemeProvider, responsiveFontSizes, makeStyles} from "@material-ui/core/styles";
import Cookies from 'universal-cookie';
import Footer from "./components/navbar/Footer";

const cookies = new Cookies();


function App(props) {
	const [darkMode, setDarkMode] = useState(false);
	const [user, setUser] = useState({user:false});
	const [didLoad, setDidLoad] = useState(false);
	useEffect(() => {
		// Update the document title using the browser API
		if (!didLoad) {
			// setUser({user:getUser()});
			setDidLoad(true);
		  }
	  }, [didLoad]);
	
	const getUser = () => {
		return cookies.get('user');
	};

	const storeUser = (user) => {
		cookies.set('user', user, { expires: 0 });
		setUser({user:user});
	};

	let theme = createMuiTheme({
		palette: {
			primary: {
				main: "#6aabc4",
			},
			secondary: {
				main: "#de614b",
			},
			type: darkMode ? "light" : "dark"
		}
	});
	theme = responsiveFontSizes(theme);
	const useStyles = makeStyles((theme) => ({
		fullScreen: {
			height: "100vh" ,
			width: "100%"
		}
	}));
	const classes = useStyles();
	
	return (
		<ThemeProvider theme={theme}>
			<Paper className={classes.fullScreen}>
			<BrowserRouter>
				<Route
					exact
					path="/"
					render={(props) => {
						return (
						// user['user']  ?
						// <Redirect to="/home" /> :
						<Redirect to="/login" /> 
						)
					}}
				/>
				<Route path="/login" name="Login" render={(props) =>
					{
						return (
						// user['user'] ?
						// <Redirect to="/home"/> 
						// :
						<Login user = {user['user']} setUser= {storeUser}/> 
						)
					}}
				/>
				<Route />
				<Route path="/signup" name="SignUp" render={(props) => 
					{
						return (
							// user['user']  ?
						// <Redirect to="/home"/> :
						 <SignUp user = {user['user']} setUser= {storeUser} /> 
						)
					}}
				/>
				<Route />
				<Route path="/home" name="Home" render={(props) =>
					{
						return (
							// user['user']  ?
						<Home user = {user['user']} setUser= {storeUser}/> 
						// :
						// <Redirect to="/login"/> 
						)
					}}
				/>
				<Route path="/about" name="About" render={(props) =>
					<About/>}
				/>
				<Route />
				<Route path="/myplaylists" name="My Playlists" render={(props) =>
					{
						return (
							// user['user']  ?
						<MyPlaylist user = {user['user']} setUser= {storeUser}/> 
						// <Redirect to="/login"/> 
						)
					}}
				/>
				<Route />
				<Route path="/matches" name="My Matches" render={(props) =>
					{
						return (
							// user['user']  ?
						<Matches user = {user['user']} setUser= {storeUser}/> 
						// :<Redirect to="/login"/> 
						)
					}}
				/>
				<Route />
				<Route path="/settings" name="My Settings" render={(props) =>
					{
						return (
							// user['user']  ?
						<Settings user = {user['user']} setUser= {storeUser}/> 
						// : <Redirect to="/login"/> 
						)
					}}
				/>
				<Route />
				<Route path="/notifications" name="My Notifications" render={(props) =>
					{
						return (
							// user['user']  ?
						<Notifications user = {user['user']} setUser= {storeUser}/> 
						// <Redirect to="/login"/> 
						)
					}}
				/>
				<Route />
			</BrowserRouter>
			<Footer setUser={storeUser}></Footer>
			</Paper>
		</ThemeProvider>
	);
}

export default App;
