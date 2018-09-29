import React, { Component } from 'react'

import shortid from 'shortid';

class TodoForm extends Component {
    state = {
        text: ""
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        //on submit
        this.props.onSubmit({
            id: shortid.generate(),
            text: this.state.text,
            complete: false
        });
        this.setState({
            text: ""
        });
    }

    render() {
        return (
            <form className="mt-3" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <input
                        className="form-control mx-auto"
                        name="text"
                        placeholder="Todos..."
                        value={this.state.text}
                        onChange={this.handleChange}
                        required
                    />
                </div>
                <button className="btn btn-primary mx-auto" type="submit">Add Todo</button>
            </form>
        )
    }
}

export default TodoForm;