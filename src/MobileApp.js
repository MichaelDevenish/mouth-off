import React, { Component } from 'react';
import DrawingCanvas from './DrawingCanvas';

class MobileApp extends Component {
    state = {
        x: 0,
        y: 0
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
            <DrawingCanvas
                left={left}
                top={top}
            />
        );
    }
}

export default MobileApp;
