import React, { Component } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import './App.css';
import MobileApp from './MobileApp';

class App extends Component {
    render() {
        return (
            <div className="App">
                <BrowserView>
                    <h1> Placeholder for web </h1>
                </BrowserView>

                <MobileView>
                    <MobileApp />
                </MobileView>
            </div>
        );
    }
}

export default App;
