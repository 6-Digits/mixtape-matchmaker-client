import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
// import logo from "./logo.svg";
import "./App.css";
import Login from "./components/pages/Login"
import Home from "./components/pages/Home"
import About from "./components/pages/About"
import ForgotPassword from "./components/pages/ForgotPassword"
import SignUp from "./components/pages/SignUp"
import MyPlaylist from "./components/pages/MyPlaylist"
import Matches from "./components/pages/Matches"
import Settings from "./components/pages/Settings"
import Notifications from "./components/pages/Notifications"
import {Paper} from '@material-ui/core';
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles"

let checkUserStatus = () => {
    return null;
};
const theme = createMuiTheme({
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

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            apiResponse: "app not working" 
        };
        // this.user = checkUserStatus();
        this.user = null;
    }
    
    callAPI() {
        fetch("http://localhost:42069", { mode: 'no-cors' })
            .then(response => response.text())
            .then(data => {
                this.setState({ apiResponse: data });
                console.log('data=' + data);
            })
            .catch(error => error);
    }

    componentDidMount() {
        this.callAPI();
    }

    render() {
        return (
			<ThemeProvider theme={theme}>
				<Paper>
				<BrowserRouter>
					<Route
						exact
						path="/"
						render={(props) => {
							return (
							this.user ?
							<Redirect to="/home" /> :
							<Redirect to="/login" /> 
							)
						}}
					/>
					<Route path="/login" name="Login" render={(props) =>
						<Login/>}
					/>
					<Route />
					<Route path="/signup" name="SignUp" render={(props) => 
						{
							return (
							this.user ?
							<Redirect to="/home"/> :
							<SignUp/> 
							)
						}}
					/>
					<Route />
					<Route path="/home" name="Home" render={(props) =>
						{
							return (
							this.user ?
							<Home/> :
							<Redirect to="/login"/> 
							)
						}}
					/>
					<Route path="/about" name="About" render={(props) =>
						<About/>}
					/>
					<Route />
					<Route path="/forgotpassword" name="Forgot Password" render={(props) =>
						{
							return (
							this.user ?
							<Redirect to="/home"/> :
							<ForgotPassword/> 
							)
						}}
					/>
					<Route />
					<Route path="/myplaylist" name="My Playlists" render={(props) =>
						{
							return (
							this.user ?
							<MyPlaylist/> :
							<Redirect to="/login"/> 
							)
						}}
					/>
					<Route />
					<Route path="/matches" name="My Matches" render={(props) =>
						{
							return (
							this.user ?
							<Matches/> :
							<Redirect to="/login"/> 
							)
						}}
					/>
					<Route />
					<Route path="/settings" name="My Settings" render={(props) =>
						{
							return (
							this.user ?
							<Settings/> :
							<Redirect to="/login"/> 
							)
						}}
					/>
					<Route />
					<Route path="/notifications" name="My Notifications" render={(props) =>
						{
							return (
							this.user ?
							<Notifications/> :
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
}

export default App;
