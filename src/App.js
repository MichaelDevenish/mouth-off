import React, { Component, Fragment } from 'react';
import { isBrowser, BrowserView, MobileView } from 'react-device-detect';
import './App.css';
import Peer from 'peerjs';
import MobileApp from './MobileApp';
import DrawingCanvas from "./DrawingCanvas";
import ConnectInput from "./ConnectInput.js";

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

        conn: null,

        isConnected: false,

        dataCount: 0,

        runTime: 0,
      };
    }

    dataFrequency = () => {
        const points = this.state.dataCount || 0;
        const time = this.state.runTime || 0;
        return points / time;
    }

    componentDidMount() {
        const { peer } = this.state;

        peer.on('error', (err) => {
            console.log('error', err);
        });

        peer.on('connection', (conn) => {
            this.handleSetConn(conn);
            console.log('conn', conn);
            setInterval(() => {
                    this.setState({
                        runTime: this.state.runTime + 1
                    });
                    console.log('Frequency: ', this.dataFrequency());   
                }, 1000);

            this.state.conn.on('data', (data) => {
                this.setState({
                    dataCount: this.state.dataCount + 1
                });
                
                // console.log('data', data);
                if (data.type === "draw") {
                    let x, y;
                    // Detect if we got a recenter request
                    if (data.recenter) {
                        y = window.innerHeight / 2;
                        x = window.innerWidth / 2;
                    } else {
                        y = (this.state.y + (0.2 * parseFloat(data.alpha).toFixed(1)) * -1);
                        x = (this.state.x + (0.2 * parseFloat(data.gamma).toFixed(1)) * -1);

                    }
                    this.setState({
                        x: x,
                        y: y,
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

    DesktopConnectionSwitch = (props) => {
        if (props.isConnected) {
            // Show the Canvas
            return ( <Fragment>
                    <div className="nav">
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
            return (
                <div id="login">
                    <object type="image/svg+xml" data="img/trebuchet.svg" width="200" height="224">
                        <img src="img/trebuchet.png" width="200" height="224" alt="Trebuchet" />
                    </object>
                    <h1>Connection code</h1>
                    <div id="loginCode"><p>{this.state.id}</p></div>
                    <p>Go to this website on your phone and use the code above to make a drawing on the screen with your phone.</p>
               </div>
            )        
        }
    };

    MobileConnectionSwitch = (props) => {
        if (props.isConnected) {
            // Show the Canvas
            return (
                <MobileApp conn={this.state.conn} id={this.state.id} peer={this.state.peer} />
            )
        } else {
            // Show the ConnectionScreen
            return (
                <ConnectInput connectHandler={this.connectHandler} />
            )
        }
    };

    connectHandler = (stringId) => {
        var conn = this.state.peer.connect(stringId);
        this.handleSetConn(conn);
        conn.on('open', function () {
            console.log('connection open', conn);
            conn.send('Connection Established');
        });
    }

    render() {
        return (
            <div className="App">
                <BrowserView>
                    <this.DesktopConnectionSwitch isConnected={this.state.isConnected} />
                </BrowserView>

                <MobileView>
                    <this.MobileConnectionSwitch isConnected={this.state.isConnected} />
                </MobileView>
            </div>
        );
    }
}

export default App;
