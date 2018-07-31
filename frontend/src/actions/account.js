import { ACCOUNT } from './types';
import { BACKEND } from '../config';

export const signup = ({ username, password }) => dispatch => {
  dispatch({ type: ACCOUNT.FETCH });

  return fetch(`${BACKEND.ADDRESS}/account/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
    .then(response => response.json())
    .then(json => {
      if (json.type === 'error') {
        dispatch({ type: ACCOUNT.FETCH_ERROR, message: json.message });
      } else {
        // mixes json.account and json.message
        dispatch({ type: ACCOUNT.FETCH_SUCCESS, ...json });
      }
    })
    .catch(error => dispatch({ type: ACCOUNT.FETCH_ERROR, message: error.message }));
};