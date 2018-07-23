import React, { Component } from 'react';

class Generation extends Component {
  state = { generation: { generationId: 999, expiration: '2020-05-01' } };

  componentDidMount() {
    this.fetchGeneration();
  }

  fetchGeneration = () => {
    fetch('http://localhost:3000/generation')
      .then(response => response.json())
      .then(json => this.setState({ generation: json.generation }));
  };

  render() {
    const { generation } = this.state;

    console.log('generation', generation);

    return (
      <div>
        <h3>Generation {generation.generationId}. Expires on:</h3>
        <h4>{new Date(generation.expiration).toString()}</h4>
      </div>
    );
  }
}

export default Generation;