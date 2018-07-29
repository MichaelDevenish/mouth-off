import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class DrawingCanvas extends Component {
    state = {
        prevPos: {
            offsetX: 0,
            offsetY: 0
        }
    }

    componentDidMount() {
        if (window.DeviceMotionEvent) {
            window.addEventListener("devicemotion", this.motion, false)
        }
    }

    componentWillReceiveProps(nextProps) {
        const {
            penDown
        } = this.props

        let {
            top,
            left
        } = this.itemPoints(50,100)

        const {
            prevPos: {
                offsetX,
                offsetY
            }
        } = this.state

        const ctx = this.refs.canvas.getContext('2d')
        ctx.beginPath()
        ctx.strokeStyle = 'rgb(0,0,0)'
        ctx.lineJoin = 'round'
        ctx.lineCap = 'round'
        ctx.lineWidth = 5
        ctx.moveTo(offsetX, offsetY)
        if (penDown) {
            ctx.lineTo(left, top)
            ctx.stroke()
        }

        this.setState({
            prevPos: {
                offsetX: left,
                offsetY: top
            }
        })
    }

    itemPoints = (width, height) => {
        let {
            top,
            left
        } = this.props

        const maxWidth = window.innerWidth - width
        const maxHeight = window.innerHeight - height
        if (top > maxHeight) top = maxHeight
        if (left > maxWidth) left = maxWidth
        if (top < 0) top = 0
        if (left < 0) left = 0

        return {
            top,
            left
        }
    }

    render() {
        let {
            top,
            left
        } = this.itemPoints(55,105)


        return (
            <Fragment>
                <canvas
                    className='canvas'
                    ref="canvas"
                    width={window.innerWidth-50}
                    height={window.innerHeight-100}
                />
                <div class="ball" style={{ left: left - 5 , top: top -5 }} />
            </Fragment>
        )
    }
}

DrawingCanvas.propTypes = {
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    pendown: PropTypes.bool.isRequired
}

DrawingCanvas.defaultProps = {
    penDown: false
}

export default DrawingCanvas
