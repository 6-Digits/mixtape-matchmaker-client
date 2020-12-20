import React, { useState, useEffect } from "react";
import { BrowserRouter,Switch, Route, Redirect } from 'react-router-dom';
import { Paper, CssBaseline } from '@material-ui/core';
import { createMuiTheme, ThemeProvider, responsiveFontSizes, makeStyles } from "@material-ui/core/styles";
import "./App.css";
import Login from "./components/pages/Login";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import SignUp from "./components/pages/SignUp";
import MyPlaylist from "./components/pages/MyPlaylists";
import Matches from "./components/pages/Matches";
import Settings from "./components/pages/Settings";
import Search from "./components/pages/Search";
import Share from "./components/pages/Share";
import NotificationSocket from './components/frameworks/NotificationSocket';

const api = window.location.protocol+'//'+window.location.hostname+':42069';

function App() {
	const [darkMode] = useState(false);
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
	const { notifications, sendNotification, setNotifications } = NotificationSocket(user ? user._id : "", user ? user : {_id : ""});
	
	useEffect(() => {
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
		let response = await fetch(api + '/account/me', requestOptions);
		if(response.status === 200) {
			let data = await response.json();
			setUser(data);
			localStorage.setItem('user', JSON.stringify(data));		
		}
	};
	
	const storeUser = (userToken) => {
		let tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
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
			'*::-webkit-scrollbar': {
			  width: '8px',
			  height: '4px'
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
			height: "100vh" ,
			width: "100%",
			margin: 0
		}
	}));
	const classes = useStyles();
	
	return (
		<ThemeProvider theme={theme} className={classes.encompassScreen}>
			<CssBaseline />
			<Paper className={classes.fullScreen}>
				<BrowserRouter className={classes}>
					<Switch>
						<Route path="/login" name="Login" render={() => {
								return (
									user ?
									<Redirect to="/home" /> :
									<Login user={user} setUser={setUser} storeUser={storeUser} fetchUser={fetchUser}/>
								)
							}}
						/>
						<Route path="/signup" name="SignUp" render={() => {
								return (
									user  ?
									<Redirect to="/home" /> :
									<SignUp user={user} setUser={setUser} storeUser={storeUser} fetchUser={fetchUser}/> 
								)
							}}
						/>
						<Route path="/home" name="Home" render={() => {
								return (
									user  ?
									<Home user={user} setUser={setUser} setNotifications={setNotifications}
									sendNotification={sendNotification} notifications={notifications} /> :
									<Redirect to="/login" /> 
								)
							}}
						/>
						<Route path="/about" name="About" render={() => <About />} />
						<Route path="/myplaylists" name="My Playlists" render={() => {
								return (
									user ?
									<MyPlaylist user={user} setUser={setUser} setNotifications={setNotifications}
									sendNotification={sendNotification} notifications={notifications}/>  :
									<Redirect to="/login" /> 
								)
							}}
						/>
						<Route path="/matches" name="My Matches" render={() => {
								return (
									user ?
									<Matches user={user} setUser={setUser} setNotifications={setNotifications}
									sendNotification={sendNotification} notifications={notifications}/> :
									<Redirect to="/login" /> 
								)
							}}
						/>
						<Route path="/settings" name="My Settings" render={() => {
								return (
									user ?
									<Settings user={user} setUser={setUser} storeUser={storeUser} fetchUser={fetchUser} 
									setNotifications={setNotifications} sendNotification={sendNotification} notifications={notifications}/> :
									<Redirect to="/login" /> 
								)
							}}
						/>
						<Route path="/search" name="Search" render={() => {
								return (
									user ?
									<Search user={user} setUser={setUser} setNotifications={setNotifications}
									sendNotification={sendNotification} notifications={notifications}/> :
									<Redirect to="/login" /> 
								)
							}}
						/>
						<Route path="/share/:id?" name="Search" render={(props) => {
								return (
									user ?
									<Share user={user} setUser={setUser} setNotifications={setNotifications} 
									sendNotification={sendNotification} notifications={notifications} {...props}/>:
									<Redirect to="/login" /> 
								)
							}}
						/>
						<Route path="/" render={() => {
								return (
									user  ?
									<Redirect to="/home" user={user} setUser={setUser} setNotifications={setNotifications}
									sendNotification={sendNotification} notifications={notifications}/> :
									<Redirect to="/login" /> 
								)
							}}
						/>
					</Switch>
				</BrowserRouter>
			</Paper>
		</ThemeProvider>
		
	);
}

export default App;
