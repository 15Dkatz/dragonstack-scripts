import React, { Component } from 'react';

const DEFAULT_DRAGON = { generationId: '', nickname: '', birthdate: '', traits: [] };

class Dragon extends Component {
  state = { dragon: DEFAULT_DRAGON };

  componentDidMount() {
    this.fetchDragon();
  }

  fetchDragon() {
    fetch('http://localhost:3000/dragon/new')
      .then(response => response.json())
      .then(json => {
        console.log('json', json);
        this.setState({ dragon: json.dragon });
      });
  }

  render() {
    // console.log('dragon', this.state.dragon);
    const { dragon } = this.state;

    // Next video will extract this into a DragonAvatar component, and introduce props.
    return (
      <div>
        <span>G{dragon.generationId}.</span>
        <span>I{dragon.dragonId}. </span>
        {
          dragon.traits.map(({ traitValue }) => `${traitValue}`).join(', ')
        }
      </div>
    )
  }
}

export default Dragon;
