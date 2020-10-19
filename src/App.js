import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "./components/pages/Login"
import Home from "./components/pages/Home"

let checkUserStatus = () => {
    return null;
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            apiResponse: "app not working" 
        };
        this.user = checkUserStatus();
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
            <div className="App">
                <header className="App-header">
                    {this.state.apiResponse}
                </header>
                {this.user ? <Home></Home> : <Login user={this.user}></Login>}
            </div>
        );
    }
}

export default App;
