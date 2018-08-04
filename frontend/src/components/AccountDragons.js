import React, { Component } from 'react';
import { connect } from 'react-redux';
import AccountDragonRow from './AccountDragonRow';
import { fetchAccountDragons } from '../actions/accountDragons';

class AccountDragons extends Component {
  componentDidMount() {
    console.log('fetch account dragons');
    this.props.fetchAccountDragons();
  }

  render() {
    return (
      <div>
        <h3>Account Dragons</h3>
        {
          this.props.accountDragons.dragons.map(dragon => {
            return (
              <div key={dragon.dragonId}>
                <AccountDragonRow dragon={dragon} />
                <hr />
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default connect(
  ({ accountDragons }) => ({ accountDragons }),
  { fetchAccountDragons }
)(AccountDragons);