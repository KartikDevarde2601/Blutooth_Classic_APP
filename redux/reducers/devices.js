import {createSlice} from '@reduxjs/toolkit';

export const devicesSlice = createSlice({
  name: 'Devices',
  initialState: {
    devices: [],
    selectedDevice: null,
  },

  reducers: {
    setDevices: (state, action) => {
      state.devices = action.payload;
    },
    setSelectedDevice: (state, action) => {
      state.selectedDevice = action.payload;
    },
  },
});

export const selectDevices = state => state.devices.devices;
export const selectSelectedDevice = state => state.devices.selectedDevice;

export const {setDevices, setSelectedDevice} = devicesSlice.actions;

export default devicesSlice.reducer;
