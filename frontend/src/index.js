import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import Generation from './components/Generation';
import Dragon from './components/Dragon';
import './index.css';

const DEFAULT_GENERATION = { generationId: '', expiration: '' };

const GENERATION_ACTION_TYPE = 'GENERATION_ACTION_TYPE';

// const generationReducer = (state = { generation: DEFAULT_GENERATION }, action) => {
// const generationReducer = (state) => {
const generationReducer = (state, action) => {
  if (action.type === GENERATION_ACTION_TYPE) {
    return { generation: action.generation };
  }

  return { generation: DEFAULT_GENERATION };
};

const store = createStore(generationReducer);

store.subscribe(() => console.log('store state update', store.getState()));

store.dispatch({ type: 'foo' });
store.dispatch({
  type: GENERATION_ACTION_TYPE,
  generation: { generationId: 'goo', expiration: 'bar' }
});

console.log('store', store);
console.log('store.getState()', store.getState());

const generationActionCreator = payload => {
//   // the object is the action
  return {
    type: GENERATION_ACTION_TYPE,
    generation: payload
  };
}

const zooAction = generationActionCreator(
  { generationId: 'zoo', expiration: 'bar '}
);

store.dispatch(zooAction);

fetch('http://localhost:3000/generation')
  .then(response => response.json())
  .then(json => store.dispatch(
    generationActionCreator(json.generation))
  );


// setTimeout(() => {
//   store.dispatch(
//     generationActionCreator(zooAction)
//   );
// }, 2500);


// // setTimeout(() => {
//   fetch('http://localhost:3000/generation')
//     .then(response => response.json())
//     .then(json => {
//       console.log('json', json);

//       store.dispatch(generationActionCreator(json.generation))
//     });
// }, 5000);

render(
  <div>
    <h2>Dragon Stack</h2>
    <Generation />
    <Dragon />
  </div>,
  document.getElementById('root')
);