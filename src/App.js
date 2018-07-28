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
      this.handleSetConn = this.handleSetConn.bind(this);
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

    componentDidMount() {
        const { peer } = this.state;

        peer.on('error', (err) => {
            console.log('error', err);
        });

        peer.on('connection', (conn) => {
            this.handleSetConn(conn);
            console.log('conn', conn);
            this.state.conn.on('data', function(data){
                console.log('data', data);
            });
        });
    }

    handleSetConn(conn) {
        this.setState({
            conn
        });
    }

    render() {
        return (
            <div className="App">
                <BrowserView>
                  <h1> {this.state.id} </h1>
                  <div>
                    {this.state.messages.join(', ')}
                  </div>
                  <MobileApp id={this.state.id} peer={this.state.peer} handleSetConn={this.handleSetConn}/>
                </BrowserView>

                <MobileView>
                  <h1> {this.state.id} </h1>
                  <MobileApp id={this.state.id} peer={this.state.peer} handleSetConn={this.handleSetConn}/>
                </MobileView>
            </div>
        );
    }
}

export default App;
