const Dragon = require('./dragon');

const fooey = new Dragon({ birthdate: new Date(), nickname: 'fooey' });
const baloo = new Dragon({
  nickname: 'baloo',
  birthdate: new Date(),
  traits: {
    backgroundColor: 'white',
    pattern: 'patchy',
    build: 'sporty',
    size: 'large'
  }
});

console.log('fooey', fooey);
console.log('baloo', baloo);
