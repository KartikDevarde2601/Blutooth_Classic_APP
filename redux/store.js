import {combineReducers} from '@reduxjs/toolkit';
import {configureStore} from '@reduxjs/toolkit';
import devicesReducer from './Slices/devices.Slice';
import bluetoothStateReducer from './Slices/blutoothState.Slice';

const rootReducer = combineReducers({
  devices: devicesReducer,
  bluetoothState: bluetoothStateReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
