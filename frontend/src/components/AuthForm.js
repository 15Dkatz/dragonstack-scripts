import React, { Component } from 'react';
import { Button, FormGroup, FormControl } from 'react-bootstrap';

class AuthForm extends Component {
  state = { username: '', password: '' };

  updateUsername = event => {
    this.setState({ username: event.target.value });
  }

  updatePassword = event => {
    this.setState({ password: event.target.value });
  }

  signup = () => {
    console.log('this.state', this.state);
  }

  login = () => {
    console.log('this.state', this.state);
  }

  render() {
    return (
      <div>
        <h2>Dragon Stack</h2>
        <FormGroup>
          <FormControl
            type='text'
            value={this.state.username}
            placeholder='username'
            onChange={this.updateUsername}
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            type='password'
            value={this.state.password}
            placeholder='password'
            onChange={this.updatePassword}
          />
        </FormGroup>
        <div>
          <Button onClick={this.login}>Log In</Button>
          <span> or </span>
          <Button onClick={this.signup}>Sign Up</Button>
        </div>
      </div>
    );
  }
}

export default AuthForm;

// export default connect(({ account }) => ({ account }), null)(Root);