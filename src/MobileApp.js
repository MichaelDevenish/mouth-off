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
        pendown: false,
        connectedTo: null,
        id: this.props.id.id,
        peer: this.props.peer
    }

    motion = (event) => {
        const {
            x,
            y
        } = this.state

        let top = (y + (2 * parseFloat(event.accelerationIncludingGravity.y).toFixed(1)));
        let left = (x + (2 * parseFloat(event.accelerationIncludingGravity.x).toFixed(1)) * -1);

        const maxWidth = window.innerWidth - 4;
        const maxHeight = window.innerHeight - 4;
        if (top > maxHeight) top = maxHeight
        if (left > maxWidth) left = maxWidth
        if (top < 0) top = 0
        if (left < 0) left = 0

        this.setState({
            x: left,
            y: top
        })
        if (this.props.conn === null) {
            console.log("no connection");
        } else {
            this.props.conn.send({
                type: "🖌️",
                penDown: this.state.pendown,
                x: left,
                y: top
            });
        }
    }

    connectHandler(stringId) {
        var conn = this.state.peer.connect(stringId);
        this.props.handleSetConn(conn);
        conn.on('open', function(){
            console.log('connection open', conn);
            conn.send('Connection Established');
        });
    }

    handlePenChange(pendown) {
        this.setState({pendown});
    }

    componentDidMount() {
        if (window.DeviceMotionEvent) {
            window.addEventListener("devicemotion", this.motion, false)
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
                <button onMouseDown={() => handlePenChange(true)} onMouseUp={() => handlePenChange(false)} type="button">Draw!</button> 
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
