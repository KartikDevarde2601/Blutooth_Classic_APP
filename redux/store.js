import {combineReducers} from '@reduxjs/toolkit';
import {configureStore} from '@reduxjs/toolkit';
import devicesReducer from './Slices/devices.Slice';

const rootReducer = combineReducers({
  devices: devicesReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
