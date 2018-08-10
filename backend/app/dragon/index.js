const TRAITS = require('../../data/traits');

const DEFAULT_PROPERTIES = {
  nickname: 'unnamed',
  isPublic: false,
  saleValue: 0,
  sireValue: 0,
  generationId: undefined,
  get birthdate() {
    return new Date()
  },
  get randomTraits() {
    const traits = [];

    Object.keys(TRAITS).forEach(TRAIT_KEY => {
      const TRAIT_VALUES = TRAITS[TRAIT_KEY];

      const traitValue = TRAIT_VALUES[Math.floor(Math.random() * TRAIT_VALUES.length)];

      traits.push({ traitType: TRAIT_KEY, traitValue });
    });

    return traits;
  }
}

class Dragon {
  constructor({ birthdate, nickname, traits, generationId, isPublic, saleValue, sireValue } = {}) {
    this.birthdate = birthdate || DEFAULT_PROPERTIES.birthdate;
    this.nickname = nickname || DEFAULT_PROPERTIES.nickname;
    this.traits = traits || DEFAULT_PROPERTIES.randomTraits;
    this.generationId = generationId || DEFAULT_PROPERTIES.generationId;
    this.isPublic = isPublic || DEFAULT_PROPERTIES.isPublic;
    this.saleValue = saleValue || DEFAULT_PROPERTIES.saleValue;
    this.sireValue = sireValue || DEFAULT_PROPERTIES.sireValue;
  }
}

module.exports = Dragon;