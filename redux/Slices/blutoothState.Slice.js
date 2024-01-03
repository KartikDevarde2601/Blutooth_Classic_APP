import {createSlice} from '@reduxjs/toolkit';

export const bluetoothStateSlice = createSlice({
  name: 'bluetoothState',
  initialState: {
    isEnable: false, // Corrected typo
    isDiscovering: false,
    reducer: {
      setisEnabled: (state, action) => {
        state.isEnable = action.payload;
      },
      setisDiscovering: (state, action) => {
        state.isDiscovering = action.payload;
      },
    },
  },
});

export const {setisEnable, setisDiscovering} = bluetoothStateSlice.actions;

export default bluetoothStateSlice.reducer;
