import { DRAGON } from './types';

export const fetchDragon = () => dispatch => {
  dispatch({ type: DRAGON.FETCH });

  return fetch('http://localhost:3000/dragon/new')
    .then(response => response.json())
    .then(json => {
      if (json.type === 'error') {
        dispatch({ type: DRAGON.FETCH_ERROR, message: json.message });
      } else {
        dispatch({ type: DRAGON.FETCH_SUCCESS, dragon: json.dragon });
      }
    })
    .catch(error => dispatch({ type: DRAGON.FETCH_ERROR, message: error.message }));
};