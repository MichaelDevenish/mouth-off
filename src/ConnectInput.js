import React from "react";

export default class {
    constructor(props) {
        super(props);
        this.state = {
            input: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(input) {
        this.setState(input);
    }

    render() {
        const { connectHandler } = this.props; 
        const { input } = this.state;
        return (
            <div>
                <input value={input} onChange={this.handleChange} />
                <button onClick={() => connectHandler(input)} type="button">Connect</button> 
            </div>
        )
        
    }
}
