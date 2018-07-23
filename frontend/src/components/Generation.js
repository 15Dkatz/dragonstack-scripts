import React, { Component } from 'react';

class Generation extends Component {
  // state = { generation:  }

  render() {
    // const { generation } = this.state;
    const generation = { id: 999, expiration: '2020-05-01' };

    return (
      <div>
        <h3>Generation {generation.id}. Expires on:</h3>
        <h4>{new Date(generation.expiration).toString()}</h4>
      </div>
    );
  }
}

export default Generation;