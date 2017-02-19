import React, {Component} from "react";

export class SendMessageForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state);
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Meddelande
                    <input name="content" value={this.state.content} required="required" onChange={this.handleInputChange} />
                </label>
                <button type="submit">Skicka</button>
            </form>
        )
    }
}