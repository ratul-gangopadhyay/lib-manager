import { combineReducers } from 'redux';
import { bookReducer } from './bookRedux';
import { userReducer } from './userRedux';

const rootReducer = combineReducers({
  books: bookReducer,
  users: userReducer,
});

export default rootReducer;
