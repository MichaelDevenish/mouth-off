import React, { Component } from 'react';
import { isBrowser, BrowserView, MobileView } from 'react-device-detect';
import logo from './logo.svg';
import './App.css';
import Peer from 'peerjs';
import MobileApp from './MobileApp';

/**
 * Genrate the 'unique' pin for connecting between peers
 */
function generatePin () {
    const min = 0;
    const max = 9999;
    return ("0" + (Math.floor(Math.random() * (max - min + 1)) + min)).substr(-4);
}

class App extends Component {

    constructor(props) {
      super(props);
      const id = `${generatePin()}`
      this.state = {
        // Store the pin/id for display and reference
        id: id,
        
        // Register the client with the peerjs-server
        peer: new Peer(id, { host: 'localhost', port: 9000, path: '/', key: 'peerjs' }),

        // Record the client type for easy reference
        type: isBrowser ? 'browser' : 'mobile',

        messages: [
          'test',
          'test2'
        ],
      };
    }

    render() {
        return (
            <div className="App">
                <BrowserView>
                  <h1> {this.state.id} </h1>
                  <div>
                    {this.state.messages.join(', ')}
                  </div>
                </BrowserView>

                <MobileView>
                  <h1> {this.state.id} </h1>
                  <MobileApp />
                </MobileView>
            </div>
        );
    }
}

export default App;
