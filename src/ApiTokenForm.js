import React, {Component} from "react";
import PropTypes from 'prop-types';

class ApiTokenForm extends Component {

    constructor(props) {
        super(props);
        this.state = {apiToken: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({apiToken: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.state.apiToken);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input onChange={this.handleChange}/>
                <input type="submit" value="Submit"/>
            </form>
        );
    }
}

ApiTokenForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default ApiTokenForm;
