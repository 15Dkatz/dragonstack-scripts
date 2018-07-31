import { combineReducers } from 'redux';
import account from './account';
import generation from './generation';
import dragon from './dragon';

export default combineReducers({ account, generation, dragon });
