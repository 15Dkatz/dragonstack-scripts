import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { logout } from '../actions/account';
import Generation from './Generation';
import Dragon from './Dragon';
import AccountDragons from './AccountDragons';

class Home extends Component {
  render() {
    return (
      <div>
        <Button onClick={this.props.logout} className='logout-button'>
          Log Out
        </Button>
        <h2>Dragon Stack</h2>
        <Generation />
        <Dragon />
        <br />
        <AccountDragons />
      </div>
    );
  }
};

export default connect(null, { logout })(Home);
