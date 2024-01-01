import {combineReducers} from '@reduxjs/toolkit';
import {configureStore} from '@reduxjs/toolkit';
import devicesReducer from './reducers/devices';

const rootReducer = combineReducers({
  devices: devicesReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
