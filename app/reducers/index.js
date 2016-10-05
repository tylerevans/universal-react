import { combineReducers } from 'redux';
import users from './users';
import user from './user';
import markets from './markets';

export default combineReducers({
  users,
  user,
  markets,
});
