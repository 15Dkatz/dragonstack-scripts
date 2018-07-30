import React, { Component } from 'react';
import Home from './Home';
import AuthForm from './AuthForm';

class Root extends Component {
  render() {
    return (
      false ? <Home /> : <AuthForm />
    );
  }
}

export default Root;