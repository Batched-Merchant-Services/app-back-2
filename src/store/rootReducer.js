import { combineReducers } from 'redux';
import user from '@store/ducks/user.ducks';
import app from '@store/ducks/app.ducks';
import userGraph from '@store/reducers/userGraph.reducer';
import appGraph from '@store/reducers/appGraph.reducer';
import profile from '@store/reducers/profile.reducer';

const rootReducer = combineReducers({ app, user, appGraph, userGraph, profile });

export default rootReducer;
