import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import { createMuiTheme, ThemeProvider, responsiveFontSizes, makeStyles } from "@material-ui/core/styles";
import "./App.css";
import Login from "./components/pages/Login";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import SignUp from "./components/pages/SignUp";
import MyPlaylist from "./components/pages/MyPlaylists";
import Matches from "./components/pages/Matches";
import Settings from "./components/pages/Settings";
import Notifications from "./components/modals/Notifications";
import Search from "./components/pages/Search";
// import { useCookies } from 'react-cookie';

// const cookieName = 'mm_6digits_cookies';
const api = 'http://localhost:42069/api';

function App(props) {
	// const [cookies, setCookie, removeCookie] = useCookies([cookieName]);
	const [darkMode, setDarkMode] = useState(false);
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
	useEffect(() => {
		// let userToken = JSON.parse(cookies.get('userToken'));
		// let userToken = cookies['userToken'];
		let userToken = localStorage.getItem('userToken');
		if(userToken){
			fetchUser(userToken);
		} 
	  }, []);
	const fetchUser = async (userToken) => {
		let requestOptions = {
			method: 'GET',
			headers: {'Content-Type': 'application/json', 'x-access-token': userToken}
		};
		let response = await fetch(api + '/auth/me', requestOptions);
		if(response.status == 200) {
			let data = await response.json();
			setUser(data);
			localStorage.setItem('user', JSON.stringify(data));		
		}
	};
	const storeUser = (userToken) => {
		let tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		// setCookie('userToken', userToken, {path:'/', expires: tomorrow });
		localStorage.setItem('userToken', userToken);
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
		'@global': {
			// '*': {
			//   'scrollbar-width': 'thin',
			// },
			'*::-webkit-scrollbar': {
			  width: '8px',
			  height: '4px',
			},
			'*:hover::-webkit-scrollbar-thumb': {
				visibility: 'visible'
			},
			'*::-webkit-scrollbar-thumb': {
				background: theme.palette.text.secondary,
				visibility: 'hidden',
				cornerRadius: '1px'
			}
		},
		fullScreen: {
			height: "100%" ,
			width: "100%"
		},
		encompassScreen: {
		}
	}));
	const classes = useStyles();
	
	return (
		<ThemeProvider theme={theme}>
			<Paper className={classes.fullScreen}>
				<BrowserRouter className={classes}>
					<Route exact path="/" render={(props) => {
							return (
								user  ?
								<Redirect to="/home" user={user} setUser={setUser} /> :
								<Redirect to="/login" /> 
							)
						}}
					/>
					<Route path="/login" name="Login" render={(props) => {
							return (
								user ?
								<Redirect to="/home" /> :
								<Login user={user} setUser={setUser} storeUser={storeUser} fetchUser={fetchUser}/>
							)
						}}
					/>
					<Route path="/signup" name="SignUp" render={(props) => {
							return (
								user  ?
								<Redirect to="/home" /> :
								<SignUp user={user} setUser={setUser} storeUser={storeUser} fetchUser={fetchUser}/> 
							)
						}}
					/>
					<Route path="/home" name="Home" render={(props) => {
							return (
								user  ?
								<Home user={user} setUser={setUser} /> :
								<Redirect to="/login" /> 
							)
						}}
					/>
					<Route path="/about" name="About" render={(props) => <About />} />
					<Route path="/myplaylists" name="My Playlists" render={(props) => {
							return (
								user ?
								<MyPlaylist user={user} setUser={setUser} />  :
								<Redirect to="/login" /> 
							)
						}}
					/>
					<Route path="/matches" name="My Matches" render={(props) => {
							return (
								user ?
								<Matches user={user} setUser={setUser} /> :
								<Redirect to="/login" /> 
							)
						}}
					/>
					<Route path="/settings" name="My Settings" render={(props) => {
							return (
								user ?
								<Settings user={user} setUser={setUser} storeUser={storeUser} fetchUser={fetchUser}/> :
								<Redirect to="/login" /> 
							)
						}}
					/>
					<Route path="/search" name="Search" render={(props) => {
							return (
								user ?
								<Search user={user} setUser={setUser} /> :
								<Redirect to="/login" /> 
							)
						}}
					/>
				</BrowserRouter>
			</Paper>
		</ThemeProvider>
	);
}

export default App;
