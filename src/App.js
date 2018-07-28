import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AccelerometerCanvas from './AccelerometerCanvas';


class App extends Component {
    render() {
        return (
            <div className="App">
                <AccelerometerCanvas />
            </div>
        );
    }
}

export default App;
