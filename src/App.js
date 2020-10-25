import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
// import logo from "./logo.svg";
import "./App.css";
import Login from "./components/pages/Login"
import Home from "./components/pages/Home"
import About from "./components/pages/About"
import SignUp from "./components/pages/SignUp"
import MyPlaylist from "./components/pages/MyPlaylist"
import Matches from "./components/pages/Matches"
import Settings from "./components/pages/Settings"
import Notifications from "./components/pages/Notifications"
import {Paper} from '@material-ui/core';
import {createMuiTheme, ThemeProvider, responsiveFontSizes} from "@material-ui/core/styles"

let checkUserStatus = () => {
    return null;
};


function App(props) {
	const [user, setUser] = useState({
		user: null
	});
	let theme = createMuiTheme({
		palette: {
			primary: {
				main: "#6aabc4",
			},
			secondary: {
				main: "#6aabc4",
			},
			type: "dark"
		}
	});
	theme = responsiveFontSizes(theme);
    // constructor(props) {
    //     super(props);
    //     this.state = { 
	// 		apiResponse: "app not working",
	// 		user: null
    //     };
    //     // this.user = checkUserStatus();
    //     this.user = null;
    // }
	

    // callAPI() {
    //     fetch("http://localhost:42069", { mode: 'no-cors' })
    //         .then(response => response.text())
    //         .then(data => {
    //             this.setState({ apiResponse: data });
    //             console.log('data=' + data);
    //         })
    //         .catch(error => error);
    // }

    // componentDidMount() {
    //     this.callAPI();
    // }
	return (
		<ThemeProvider theme={theme}>
			<Paper>
			<BrowserRouter>
				<Route
					exact
					path="/"
					render={(props) => {
						return (
						user['user'] ?
						<Redirect to="/home" /> :
						<Redirect to="/login" /> 
						)
					}}
				/>
				<Route path="/login" name="Login" render={(props) =>
					{
						return (
						user['user'] ?
						<Redirect to="/home"/> :
						<Login user = {user} setUser= {setUser}/> 
						)
					}}
				/>
				<Route />
				<Route path="/signup" name="SignUp" render={(props) => 
					{
						return (
						user['user']  ?
						<Redirect to="/home"/> :
						<SignUp user = {user} setUser= {setUser} /> 
						)
					}}
				/>
				<Route />
				<Route path="/home" name="Home" render={(props) =>
					{
						return (
						user['user'] ?
						<Home user = {user} setUser= {setUser}/> :
						<Redirect to="/login"/> 
						)
					}}
				/>
				<Route path="/about" name="About" render={(props) =>
					<About/>}
				/>
				<Route />
				<Route path="/myplaylist" name="My Playlists" render={(props) =>
					{
						return (
						user['user'] ?
						<MyPlaylist user = {user} setUser= {setUser}/> :
						<Redirect to="/login"/> 
						)
					}}
				/>
				<Route />
				<Route path="/matches" name="My Matches" render={(props) =>
					{
						return (
						user['user'] ?
						<Matches user = {user} setUser= {setUser}/> :
						<Redirect to="/login"/> 
						)
					}}
				/>
				<Route />
				<Route path="/settings" name="My Settings" render={(props) =>
					{
						return (
						user['user'] ?
						<Settings user = {user} setUser= {setUser}/> :
						<Redirect to="/login"/> 
						)
					}}
				/>
				<Route />
				<Route path="/notifications" name="My Notifications" render={(props) =>
					{
						return (
						user['user'] ?
						<Notifications user = {user} setUser= {setUser}/> :
						<Redirect to="/login"/> 
						)
					}}
				/>
				<Route />
			</BrowserRouter>
			</Paper>
		</ThemeProvider>
	);
}

export default App;
