import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
    state = {
        x: 0,
        y: 0,
        z: 0,
        alpha: 0,
        beta: 0,
        gamma: 0
    }
    motion = (event) => {
        this.setState({
            x: event.accelerationIncludingGravity.x,
            y: event.accelerationIncludingGravity.y,
            z: event.accelerationIncludingGravity.z
        })
    }

    orientation = (event) => {
        this.setState({
            alpha: event.alpha,
            beta: event.beta,
            gamma: event.gamma
        })
    }
    componentDidMount() {
        if (window.DeviceMotionEvent) {
            window.addEventListener("devicemotion", this.motion, false)
        } if (window.DeviceOrientationEvent) {
            window.addEventListener("deviceorientation", this.orientation, false)
        }
    }

    render() {
        const {
            x,
            y,
            z,
            alpha,
            beta,
            gamma
        } = this.state

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">{x}</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
            </div>
        );
    }
}

export default App;
