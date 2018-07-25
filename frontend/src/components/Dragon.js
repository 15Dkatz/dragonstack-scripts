import React, { Component } from 'react';
import DragonAvatar from './DragonAvatar';

const DEFAULT_DRAGON = { generationId: '', nickname: '', birthdate: '', traits: [] };

class Dragon extends Component {
  state = { dragon: DEFAULT_DRAGON };

  componentDidMount() {
    this.fetchDragon();
  }

  fetchDragon() {
    fetch('http://localhost:3000/dragon/new')
      .then(response => response.json())
      .then(json => this.setState({ dragon: json.dragon }));
  }

  render() {
    return <DragonAvatar dragon={this.state.dragon} />;
  }
}

export default Dragon;
