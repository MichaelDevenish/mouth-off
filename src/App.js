import React, { Component } from 'react';
import { isBrowser, BrowserView, MobileView } from 'react-device-detect';
import logo from './logo.svg';
import './App.css';
import Peer from 'peerjs';
import MobileApp from './MobileApp';
import DrawingCanvas from "./DrawingCanvas";

/**
 * Genrate the 'unique' pin for connecting between peers
 */
function generatePin () {
    const min = 0;
    const max = 9999;
    return ("0" + (Math.floor(Math.random() * (max - min + 1)) + min)).substr(-4);
}

const host = 'peer-tartupuogj.now.sh';
const port = 443;

class App extends Component {

    constructor(props) {
      super(props);
      const id = `${generatePin()}`
      this.handleSetConn = this.handleSetConn.bind(this);
      this.state = {
        // Store the pin/id for display and reference
        id: id,
        
        // Register the client with the peerjs-server
        peer: new Peer(id, { host, port, path: '/', key: 'peerjs' }),

        // Record the client type for easy reference
        type: isBrowser ? 'browser' : 'mobile',

        x: 0,
        y: 0,
        pendown: false,

        messages: [
          'test',
          'test2'
        ],
        conn: null
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
            this.state.conn.on('data', (data) => {
                console.log('data', data);
                if (data.type === "draw") {
                    console.log(`Move to ${data.x} ${data.y}`);
                    this.setState({
                        x: data.x,
                        y: data.y,
                        penDown: data.penDown
                    });
                }
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
                  <DrawingCanvas top={this.state.y} left={this.state.x} penDown={this.state.penDown}/>
                </BrowserView>

                <MobileView>
                  <h1> {this.state.id} </h1>
                  <MobileApp conn={this.state.conn} id={this.state.id} peer={this.state.peer} handleSetConn={this.handleSetConn}/>
                </MobileView>
            </div>
        );
    }
}

export default App;
