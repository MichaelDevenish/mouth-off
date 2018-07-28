import React, { Component } from 'react';

class AccelerometerCanvas extends Component {
    state = {
        x: 0,
        y: 0,
        prevPos: {
            offsetX: 0,
            offsetY: 0
        }
    }

    motion = (event) => {
        const {
            x,
            y,
            prevPos: {
                offsetX,
                offsetY
            }
        } = this.state

        let top = (y + (2 * parseFloat(event.accelerationIncludingGravity.y).toFixed(1)));
        let left = (x + (2 * parseFloat(event.accelerationIncludingGravity.x).toFixed(1)) * -1);

        const maxWidth = window.innerWidth - 4;
        const maxHeight = window.innerHeight - 4;
        if (top > maxHeight) top = maxHeight
        if (left > maxWidth) left = maxWidth
        if (top < 0) top = 0
        if (left < 0) left = 0

        const ctx = this.refs.canvas.getContext('2d');
        ctx.beginPath()
        ctx.strokeStyle = 'rgb(0,0,0)'
        ctx.moveTo(offsetX, offsetY)
        ctx.lineTo(left, top);
        ctx.stroke();

        this.setState({
            x: left,
            y: top,
            prevPos: {
                offsetX: left,
                offsetY: top
            }
        })
    }

    componentDidMount() {
        const ctx = this.refs.canvas.getContext('2d')
        ctx.lineJoin = 'round'
        ctx.lineCap = 'round'
        ctx.lineWidth = 5
        if (window.DeviceMotionEvent) {
            window.addEventListener("devicemotion", this.motion, false)
        }
    }

    render() {
        return (
            <canvas
                ref="canvas"
                width={window.innerWidth}
                height={window.innerHeight}
            />
        );
    }
}

export default AccelerometerCanvas;
