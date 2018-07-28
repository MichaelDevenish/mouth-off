import React, { Component } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import './App.css';
import AccelerometerCanvas from './AccelerometerCanvas';


class App extends Component {
    render() {
        return (
            <div className="App">
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
