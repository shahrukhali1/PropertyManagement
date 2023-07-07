// rootReducer.js
import { combineReducers } from 'redux';
import loginReducer from './reducers/loginReducer';


const rootReducer = combineReducers({
  login: loginReducer,
  // Other reducers...
});

export default rootReducer;
