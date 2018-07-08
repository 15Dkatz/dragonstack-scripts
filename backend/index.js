const Dragon = require('./dragon');

const fooey = new Dragon({ birthdate: new Date(), nickname: 'fooey' });
const baloo = new Dragon({ nickname: 'baloo', birthdate: new Date() });

const mimar = new Dragon({});
const gooby = new Dragon({});

console.log('fooey', fooey);
console.log('baloo', baloo);
console.log('mimar', mimar);

setTimeout(() => {
  const gooby = new Dragon({});
  console.log('gooby', gooby);
}, 3000);