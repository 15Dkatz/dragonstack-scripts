import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import DragonAvatar from './DragonAvatar';
const { BACKEND } = require('../config');

class AccountDragonRow extends Component {
  // https://stackoverflow.com/questions/40063468/react-component-initialize-state-from-props
  // state can start as props... Nov 17, '17
  state = {
    nickname: this.props.dragon.nickname,
    saleValue: this.props.dragon.saleValue,
    sireValue: this.props.dragon.sireValue,
    isPublic: this.props.dragon.isPublic,
    edit: false
  }

  toggleEdit = () => {
    this.setState({ edit: !this.state.edit });
  }

  updateNickname = event => {
    this.setState({ nickname: event.target.value });
  }

  updateSaleValue = event => {
    this.setState({ saleValue: event.target.value });
  }

  updateSireValue = event => {
    this.setState({ sireValue: event.target.value });
  }

  updateIsPublic = event => {
    this.setState({ isPublic: event.target.checked });
  }

  save = () => {
    fetch(`${BACKEND.ADDRESS}/dragon/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        dragonId: this.props.dragon.dragonId,
        nickname: this.state.nickname,
        saleValue: this.state.saleValue,
        sireValue: this.state.sireValue,
        isPublic: this.state.isPublic
      })
    }).then(response => response.json())
      .then(json => {
        if (json.type === 'error') {
          alert(json.message)
        } else {
          this.toggleEdit();
        }
      })
      .catch(error => alert(error));
  }

  get SaveButton() {
    return <Button onClick={this.save}>Save</Button>;
  }

  get EditButton() {
    return <Button onClick={this.toggleEdit}>Edit</Button>;
  }

  render() {
    return (
      <div>
        <div>
          <input
            type='text'
            disabled={!this.state.edit}
            value={this.state.nickname}
            onChange={this.updateNickname}
          />
        </div>
        <br />
        <DragonAvatar dragon={this.props.dragon} />
        <div>
          <span>
            Sale Value:{' '}
            <input
              type='number'
              className='account-dragon-row-input'
              disabled={!this.state.edit}
              value={this.state.saleValue}
              onChange={this.updateSaleValue}
            />
          </span>
          {' '}
          <span>
            Sire Value:{' '}
            <input
              type='number'
              className='account-dragon-row-input'
              disabled={!this.state.edit}
              value={this.state.sireValue}
              onChange={this.updateSireValue}
            />
          </span>
          {' '}
          <span>
            Public:{' '}
            <input
              type='checkbox'
              disabled={!this.state.edit}
              checked={this.state.isPublic}
              onChange={this.updateIsPublic}
            />
          </span>
          {' '}
          {
            this.state.edit ? this.SaveButton : this.EditButton
          }
        </div>
      </div>
    )
  }
}

export default AccountDragonRow;
