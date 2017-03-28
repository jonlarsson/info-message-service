import React, {Component} from "react";

export class CreateServiceForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: ""
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
            Namn
            <input name="name" value={this.state.name} required="required" onChange={this.handleInputChange}/>
          </label>
          <button type="submit">Spara</button>
        </form>
    )
  }
}