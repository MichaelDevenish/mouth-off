import React, { Component } from 'react';

class DrawingCanvas extends Component {
    state = {
        prevPos: {
            offsetX: 0,
            offsetY: 0
        }
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

    componentWillReceiveProps(nextProps) {
        let {
            top,
            left
        } = this.props

        const {
            prevPos: {
                offsetX,
                offsetY
            }
        } = this.state

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
            prevPos: {
                offsetX: left,
                offsetY: top
            }
        })
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

export default DrawingCanvas;
