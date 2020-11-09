import React, { Component } from 'react';

class SubmitForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        tag: "",
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        });
    }
  
    handleSubmit(event) {
        this.props.onAddTag(this.state)
        this.setState({
          tag: "",
        })
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="tag" value={this.state.tag} onChange={this.handleChange}  placeholder="tag"/>
          <button type="submit">Add tag</button>
        </form>
      );
    }
  }

  export default SubmitForm;