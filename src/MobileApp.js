import React, { Component, Fragment } from 'react';
import ConnectInput from './ConnectInput';
import DrawingCanvas from './DrawingCanvas';

class MobileApp extends Component {

    constructor(props) {
        super(props);
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
                alpha: event.rotationRate.alpha,
                gamma: event.rotationRate.gamma
            });
        }
        this.setState({ recenter: false });
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
                <button onMouseDown={() => this.handlePenChange()} type="button">Draw.</button> 
                <button onMouseDown={() => this.handleRecenter()} type="button">Recenter</button> 
            </Fragment>
        );
    }
}

export default MobileApp;
