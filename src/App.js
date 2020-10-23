import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import logo from "./logo.svg";
import "./App.css";
import Login from "./components/pages/Login"
import Home from "./components/pages/Home"
import SignUp from "./components/pages/SignUp"
import About from "./components/pages/About"
import ForgotPassword from "./components/pages/ForgotPassword"
import MyPlaylist from "./components/pages/MyPlaylist"
import Matches from "./components/pages/Matches"
import Settings from "./components/pages/Settings"
import Notifications from "./components/pages/Notifications"

let checkUserStatus = () => {
    return null;
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            apiResponse: "app not working" 
        };
        // this.user = checkUserStatus();
        // this.user = False;
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
            <BrowserRouter>
                {/* {user ? 
                <Redirect exact from="/" to={{ pathname: "/home" }} /> : <Redirect exact from="/" to={{ pathname: "/login" }} />} */}
				<Route path="/login" name="login" render={(props) =>
					<Login/>}
				/>
				<Route />
				<Route path="/register" name="register" render={(props) =>
					<SignUp/>}
				/>
				<Route />

				<Route path="/home" name="home" render={(props) =>
					<Homescreen/>}
				/>
				<Route />
            </BrowserRouter>
        );
    }
}

export default App;
