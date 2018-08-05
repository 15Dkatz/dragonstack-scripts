// import React, { Component } from 'react';
// import DragonAvatar from './DragonAvatar';

// class AccountDragonRow extends Component {
//   render() {
//     return (
//       <div>
//         <div>{this.props.dragon.nickname}</div>
//         <br />
//         <DragonAvatar dragon={this.props.dragon} />
//       </div>
//     )
//   }
// }

// export default AccountDragonRow;

// TODO: New backend to update the nickname at /update

import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import DragonAvatar from './DragonAvatar';
const { BACKEND } = require('../config');

class AccountDragonRow extends Component {
  // https://stackoverflow.com/questions/40063468/react-component-initialize-state-from-props
  // state can start as props... Nov 17, '17
  state = {
    nickname: this.props.dragon.nickname,
    edit: false,
    saving: false
  }

  toggleEdit = () => {
    this.setState({ edit: !this.state.edit });
  }

  updateNickname = () => event => {
    this.setState({ nickname: event.target.value });
  }

  // it's ok not to have this in the reducer. The state is local
  // and the fetch isn't returning new information
  // You get the udpates on subsequent loads of the page. And the state is localized.
  save = () => {
    this.setState({ saving: true });

    fetch(`${BACKEND.ADDRESS}/dragon/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        dragonId: this.props.dragon.dragonId, nickname: this.state.nickname
      })
    }).then(response => response.json())
      .then(json => {
        if (json.type === 'error') {
          alert(json.message)
        } else {
          this.setState({ saving: false });
          this.toggleEdit();
        }
      })
      .catch(error => alert(error));
  }

  // getters return the value without needing the function call, meaning no parentheses
  // TODO: wait so how does this automatically get called? without the final parentheses?
  get SaveButton() {
    return (
      <Button onClick={this.save}>
        { this.state.saving ? '...'  : 'Save' }
      </Button>
    )
  }

  get EditButton() {
    return <Button onClick={this.toggleEdit}>Edit</Button>;
  }

  render() {
    return (
      <div>
        <div>
          {/* The idea is that the more crypric the better... */}
          {/* In the backend we want to be simple */}
          {/* For the app we want to be mysterious... */}
          <span>
            <input
              type='text'
              disabled={!this.state.edit}
              value={this.state.nickname}
              onChange={this.updateNickname}
            />
          </span>{' '}
        </div>
        <br />
        <DragonAvatar dragon={this.props.dragon} />
        {
          this.state.edit ? this.SaveButton : this.EditButton
        }
      </div>
    )
  }
}

export default AccountDragonRow;
