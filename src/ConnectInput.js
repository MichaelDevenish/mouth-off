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
            <Fragment>
                <input value={this.state.input} onChange={this.handleChange} />
                <button onClick={() => connectHandler(this.state.input)} type="button">Connect</button> 
            </Fragment>
        )
        
    }
}
