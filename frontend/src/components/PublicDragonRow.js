import React, { Component } from 'react';
import DragonAvatar from './DragonAvatar';
import { Button } from 'react-bootstrap';

import { BACKEND } from '../config';
import history from '../history';

class PublicDragonRow extends Component {
  buy = () => {
    const { dragonId, saleValue } = this.props.dragon;

    fetch(`${BACKEND.ADDRESS}/dragon/buy`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dragonId, saleValue })
    }).then(response => response.json())
      .then(json => {
        // alert may seem unnecessary, but it allows the user to digest the re-route
        // remove it if you don't like the pop-up user experience
        alert(json.message);

        if (json.type !== 'error') {
          history.push('/account-dragons');
        }
      })
      .catch(error => alert(error.message));
  }

  render() {
    return (
      <div>
        <div>
          {this.props.dragon.nickname}
        </div>
        <DragonAvatar dragon={this.props.dragon} />
        <div>
          Sale Value: {this.props.dragon.saleValue}
        </div>
        <br />
        <Button onClick={this.buy}>Buy</Button>
      </div>
    )
  }
}

export default PublicDragonRow;
