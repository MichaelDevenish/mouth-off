import React, { Component } from 'react';
import { isMobile, isBrowser } from 'react-device-detect';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  componentWillMount() {
    let mode;
    if (isBrowser) {
      mode = 'browser';
    } else {
      mode = 'mobile';
    }
    this.setState({mode});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          {this.state.mode}
        </p>
      </div>
    );
  }
}

export default App;
