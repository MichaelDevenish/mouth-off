import React, { Component, Fragment } from 'react';
import { isBrowser, BrowserView, MobileView } from 'react-device-detect';
import logo from './logo.svg';
import './App.css';
import Peer from 'peerjs';
import MobileApp from './MobileApp';
import DrawingCanvas from "./DrawingCanvas";
import { networkOnly } from 'sw-toolbox';

/**
 * Genrate the 'unique' pin for connecting between peers
 */
function generatePin () {
    const min = 0;
    const max = 9999;
    return ("0" + (Math.floor(Math.random() * (max - min + 1)) + min)).substr(-4);
}

const host = process.env.SIGNAL_SERVER_URL || 'peer-tartupuogj.now.sh';
const port = process.env.SIGNAL_SERVER_PORT || 443;

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
        conn: null,

        isConnected: false,
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
            conn,
            isConnected: true
        });
    }

    ConnectionSwitch = (props) => {
        if (true || props.isConnected) {
            // Show the Canvas
            return ( <Fragment>
                    <div class="nav">
                        <ul>
                            <li>
                                <object type="image/svg+xml" data="/img/trebuchet.svg" width="30" height="34">
                                    <img src="/img/trebuchet-sml.png" width="30" height="34" alt="Trebuchet" />
                                </object>
                            </li>
                            <li>Trebuchet</li>
                        </ul>
                    </div>
                    <DrawingCanvas
                        top={this.state.y}
                        left={this.state.x}
                        penDown={this.state.penDown}
                    />
                </Fragment>
            )
        } else {
            // Show the ConnectionScreen
            return <h1> {this.state.id} </h1>
        }
    };

    render() {
        return (
            <div className="App">
                <BrowserView>
                    <this.ConnectionSwitch isConnected={this.state.isConnected} />
                </BrowserView>

                <MobileView>
                  <MobileApp conn={this.state.conn} id={this.state.id} peer={this.state.peer} handleSetConn={this.handleSetConn}/>
                </MobileView>
            </div>
        );
    }
}

export default App;
