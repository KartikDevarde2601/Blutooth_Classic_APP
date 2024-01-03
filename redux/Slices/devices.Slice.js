import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import RNBluetoothClassic from 'react-native-bluetooth-classic';

//action
export const fetchPairedDevices = createAsyncThunk(
  'fetchPairedDevices',
  async () => {
    console.log('fetchPairDevices call');
    const devices = await RNBluetoothClassic.getBondedDevices();
    return devices;
  },
);

export const devicesSlice = createSlice({
  name: 'PairDevices',
  initialState: {
    devices: null,
    selectedDevice: null,
    isLoading: false,
    isError: false,
  },

  extraReducers: builder => {
    builder.addCase(fetchPairedDevices.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchPairedDevices.fulfilled, (state, action) => {
      state.isLoading = false;
      state.devices = action.payload;
    });

    builder.addCase(fetchPairedDevices.rejected, (state, action) => {
      console.log('pairDeviceError', action.payload);
      state.isError = true;
    });
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

export const {setDevices, setSelectedDevice} = devicesSlice.actions;

export default devicesSlice.reducer;
