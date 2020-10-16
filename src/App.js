import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "./components/pages/login"
import Home from "./components/pages/home"

let checkUserStatus = () => {
    return null;
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            apiResponse: "" 
        };
        this.user = checkUserStatus();
    }
    
    callAPI() {
        fetch("http://localhost:42069/testAPI")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }))
            .catch(err => err);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                </header>
                {
                this.user ? 
                <Home></Home> : <Login user={this.user}></Login>
                }
            </div>
        );
    }
}

export default App;
