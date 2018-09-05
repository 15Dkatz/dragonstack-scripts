import React, { Component } from 'react';
import { skinny, slender, sporty, stocky, patchy, plain, spotted, striped } from '../assets';

// Call object collections map, to distinguish between arrays
const dragonTraitPropertyMap = {
  backgroundColor: {
    black: "#263238",
    white: "#cfd8dc",
    green: "#a5d6a7",
    blue: "#0277bd"
  },
  build: { slender, stocky, sporty, skinny },
  pattern: { plain, striped, spotted, patchy },
  size: { small: 140, medium: 170, large: 200, enormous: 230 }
}

class DragonAvatar extends Component {
  get DragonImage() {
    // not really a styling. Since it can be a style or an image
    // Therefore, property is a good name
    const propertyMap = {};

    this.props.dragon.traits.forEach(trait => {
      const { traitType, traitValue } = trait;

      propertyMap[traitType] = dragonTraitPropertyMap[traitType][traitValue];
    });

    const { backgroundColor, build, pattern, size } = propertyMap;
    const sizing = { width: size, height: size };

    return (
      <div className='dragon-avatar-image-wrapper'>
        <div className='dragon-avatar-image-background' style={{ backgroundColor, ...sizing }}></div>
        <img src={pattern} className='dragon-avatar-image-pattern' style={{ ...sizing }}/>
        <img src={build} className='dragon-avatar-image' style={{ ...sizing }}/>
      </div>
    );
  }

  render() {
    const { generationId, dragonId, traits } = this.props.dragon;

    if (!dragonId) return <div></div>;

    return (
      <div>
        <span>G{generationId}.</span>
        <span>I{dragonId}. </span>
        { traits.map(trait => trait.traitValue).join(', ') }
        { this.DragonImage }
      </div>
    );
  }
}

export default DragonAvatar;