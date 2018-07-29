import { DRAGON } from '../actions/types';
import fetchStates from './fetchStates';

const DEFAULT_DRAGON = { generationId: '', nickname: '', birthdate: '', traits: [] };

const dragon = (state = DEFAULT_DRAGON, action) => {
  switch(action.type) {
    case DRAGON.FETCH:
      return { ...state, status: fetchStates.fetching };
    case DRAGON.FETCH_ERROR:
      return { ...state, status: fetchStates.error, message: action.message };
    case DRAGON.FETCH_SUCCESS:
      return { ...state, status: fetchStates.success, message: '', ...action.dragon };
    default:
      return state;
  };
};

export default dragon;