import { combineReducers } from 'redux';
import account from './account';
import generation from './generation';
import dragon from './dragon';
import accountDragons from './accountDragons';

export default combineReducers({
  account,
  generation,
  dragon,
  accountDragons
});
