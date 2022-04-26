import { combineReducers } from 'redux';
import user from '@store/ducks/user.ducks';
import app from '@store/ducks/app.ducks';

const rootReducer = combineReducers({ app, user });

export default rootReducer;
