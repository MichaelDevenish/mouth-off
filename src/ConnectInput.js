import React, { Fragment } from "react";

export default class ConnectInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            input: event.target.value
        });
    }

    render() {
        const {connectHandler} = this.props;
        return (
            <div id="loginMobile">
                <object type="image/svg+xml" data="img/trebuchet.svg" width="200" height="224">
                    <img src="img/trebuchet.png" width="200" height="224" alt="Trebuchet" />
                </object>
                <h1>Connection code</h1>
                <input value={this.state.input} onChange={this.handleChange} />
                <br />
                <button onClick={() => connectHandler(this.state.input)} type="button">Connect</button>        
                <p>Go to this website on a computer and input the code you are given to draw on the computer screen with your phone.</p>

            </div>
        )
        
    }
}
