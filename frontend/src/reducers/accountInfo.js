import { ACCOUNT_INFO } from '../actions/types';
import fetchStates from './fetchStates';

const accountInfo = (state = {}, action) => {
  switch(action.type) {
    case ACCOUNT_INFO.FETCH:
      return { ...state, status: fetchStates.fetching };
    case ACCOUNT_INFO.FETCH_ERROR:
      return { ...state, status: fetchStates.error, message: action.message };
    case ACCOUNT_INFO.FETCH_SUCCESS:
      return { ...state, status: fetchStates.success, message: action.message, ...action.info };
      // this is important because every action goes into every reducer.
      // so the default returns itself.
    default:
      return state;
  };
};

export default accountInfo;
