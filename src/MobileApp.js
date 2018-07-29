import React, { Component, Fragment } from 'react';
import DrawingCanvas from './DrawingCanvas';
import ConnectInput from "./ConnectInput.js";

class MobileApp extends Component {

    constructor(props) {
        super(props);
        this.connectHandler = this.connectHandler.bind(this);
        this.handlePenChange = this.handlePenChange.bind(this);
    }

    state = {
        x: 0,
        y: 0,
        penDown: false,
        recenter: false,
        connectedTo: null,
        id: this.props.id.id,
        peer: this.props.peer,
        accel: {},
        rotate: {},
        event: {}
    }

    motion = (event) => {
        const {
            x,
            y
        } = this.state

        this.setState({
            accel: event.accelerationIncludingGravity,
            rotate: event.rotationRate,
            event
        });

        // Move this to the desktop
        let top = (y + (0.2 * parseFloat(event.rotationRate.alpha).toFixed(1)) * -1);
        let left = (x + (0.2 * parseFloat(event.rotationRate.gamma).toFixed(1)) * -1);


        this.setState({
            x: left,
            y: top
        })
        if (!this.props.conn) {
            console.log("no connection");
        } else {
            this.props.conn.send({
                type: "draw",
                penDown: this.state.penDown,
                recenter: this.state.recenter,
                // x: left,
                // y: top,
                alpha: event.rotationRate.alpha,
                gamma: event.rotationRate.gamma
            });
        }
        this.setState({ recenter: false });
    }

    connectHandler(stringId) {
        var conn = this.state.peer.connect(stringId);
        this.props.handleSetConn(conn);
        conn.on('open', function(){
            console.log('connection open', conn);
            conn.send('Connection Established');
        });
    }

    handlePenChange() {
        this.setState({penDown : !this.state.penDown});
    }

    handleRecenter() {
        this.setState({ recenter: true });
    }

    componentDidMount() {
        if (window.DeviceMotionEvent) {
            window.addEventListener("devicemotion", this.motion, true);
        }
    }

    render() {
        const {
            x: left,
            y: top
        } = this.state

        return (
            <Fragment>
                <ConnectInput connectHandler={this.connectHandler} />
                <button onMouseDown={() => this.handlePenChange()} type="button">Draw.</button> 
                <button onMouseDown={() => this.handleRecenter()} type="button">Recenter</button> 
                <div>
                    <h2>Acceleration</h2>
                    <p>X: {parseFloat(this.state.accel.x).toFixed(2)}</p>
                    <p>Y: {parseFloat(this.state.accel.y).toFixed(2)}</p>
                    <p>Z: {parseFloat(this.state.accel.z).toFixed(2)}</p>
                    <h2>Rotation</h2>
                    <p>Alpha: {parseFloat(this.state.rotate.alpha).toFixed(2)}</p>
                    <p>Beta: {parseFloat(this.state.rotate.beta).toFixed(2)}</p>
                    <p>Gamma: {parseFloat(this.state.rotate.gamma).toFixed(2)}</p>
                </div>
                <DrawingCanvas
                    left={left}
                    top={top}
                    penDown
                />
            </Fragment>
        );
    }
}

export default MobileApp;
