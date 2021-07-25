import { combineReducers } from 'redux';

// ## Generator Reducer Imports
import data from './reducers/data.reducer';
import app from './reducers/app.reducer';

export default combineReducers({
  data,
  app,
});
