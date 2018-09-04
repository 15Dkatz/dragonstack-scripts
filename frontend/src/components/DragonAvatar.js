import React, { Component } from 'react';
import { dragonSkinny, dragonSlender, dragonSporty, dragonStocky } from '../assets';

// Call object collections map, to distinguish between arrays
const dragonTraitStyleMap = {
  backgroundColor: {
    styleName: "backgroundColor",
    valueMap: {
      black: "#212121",
      white: "#cfd8dc",
      green: "#2e7d32",
      blue: "#0277bd"
    }
  },
  size: {
    styleName: "width",
    valueMap: {
      small: 140,
      medium: 160,
      large: 180,
      enormous: 200
    }
  }
}

const dragonImageMap = {
  slender: dragonSlender,
  stocky: dragonStocky,
  sporty: dragonSporty,
  skinny: dragonSkinny
}

// TODO: make the pattern a picture that uses the overlay style
class DragonAvatar extends Component {
  get DragonImage() {
    const imageStyle = {};
    let imageSrc;

    this.props.dragon.traits.forEach(trait => {
      const { traitType, traitValue } = trait;

      if (traitType === 'build') {
        imageSrc = dragonImageMap[traitValue];
      }

      if (traitType === 'size' || traitType === 'backgroundColor') {
        const dragonTraitStyle = dragonTraitStyleMap[traitType];

        imageStyle[dragonTraitStyle.styleName] = dragonTraitStyle.valueMap[traitValue];
      }
    });

    return (
      <div className='dragon-avatar-image-wrapper'>
        <img src={imageSrc} style={imageStyle} />
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