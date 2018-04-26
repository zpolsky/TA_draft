import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import './index.css';

// Adapted from https://serverless-stack.com/chapters/create-a-login-page.html
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    const { username, password } = this.state;
    return username.length > 0 && password.length > 0;
  }

  handleChange(event) {
    const { id, value } = event.target;
    this.setState({
      [id]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { username, password } = this.state;
    this.setState({
      password: ''
    });
    this.props.handleSubmit(username, password);
  }

  render() {
    const { username, password } = this.state;
    if (this.props.isLoggedIn) {
      return <Redirect to="/profile"/>;
    }
    return (
      <div className="login">
        <form onSubmit={e => this.handleSubmit(e)}>
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel>Username</ControlLabel>
            <FormControl
              autoFocus
              value={username}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              type="password"
              value={password}
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
        {this.props.failedLogin &&
          <h4 className="failed-login-msg">Failed Login Attempt</h4>
        }
      </div>
    );
  }
}

Login.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  failedLogin: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default Login;
