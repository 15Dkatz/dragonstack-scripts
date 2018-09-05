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
  size: { small: 100, medium: 140, large: 180, enormous: 220 }
}

// TODO: make the pattern a picture that uses the overlay style
class DragonAvatar extends Component {
  get DragonImage() {
    // not really a styling. Since it can be a style or an image
    // Therefore, property is a good name
    const propertyMap = {};

    this.props.dragon.traits.forEach(trait => {
      const { traitType, traitValue } = trait;

      propertyMap[traitType] = dragonTraitPropertyMap[traitType][traitValue];
    });

    console.log('propertyMap', propertyMap);

    const { backgroundColor, build, pattern, size } = propertyMap;
    const sizing = { width: size, height: size };

    return (
      <div className='dragon-avatar-image-wrapper'>
        <img src={build} className='dragon-avatar-image' style={sizing}/>
        <img src={pattern} className='dragon-avatar-image-pattern' style={sizing} />
        <div className='dragon-avatar-image-background' style={{ backgroundColor, ...sizing }}></div>
      </div>
    );
  }

  render() {
    const { generationId, dragonId, traits } = this.props.dragon;

    if (!dragonId) return <div></div>;

    return (
      <div className='dragon-avatar'>
        <span>G{generationId}.I{dragonId}.</span>
        { traits.map(trait => trait.traitValue).join(', ') }
        { this.DragonImage }
      </div>
    );
  }
}

export default DragonAvatar;