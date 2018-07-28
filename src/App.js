import React, { Component } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import logo from './logo.svg';
import './App.css';
import AccelerometerCanvas from './AccelerometerCanvas';


class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                </header>
                <BrowserView>
                  <h1> Placeholder for web </h1>
                </BrowserView>

                <MobileView>
                  <AccelerometerCanvas />
                </MobileView>
            </div>
        );
    }
}

export default App;
