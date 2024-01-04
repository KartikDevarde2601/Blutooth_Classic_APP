import React from 'react';
import {useEffect} from 'react';
import {Platform, PermissionsAndroid} from 'react-native';
import {Provider} from 'react-redux';
import Navigation from './navigations/main.Navigation';
import store from './redux/store';

const requestMultiple = async permissions => {
  if (Platform.OS === 'android') {
    try {
      const results = await PermissionsAndroid.requestMultiple(permissions);

      const allPermissionsGranted = Object.values(results).every(
        result => result === PermissionsAndroid.RESULTS.GRANTED,
      );

      return allPermissionsGranted;
    } catch (err) {
      console.error(err);
    }
  }
};

const ACCESS_FINE_LOCATION = 'android.permission.ACCESS_FINE_LOCATION';
const BLUETOOTH_CONNECT = 'android.permission.BLUETOOTH_CONNECT';
const BLUETOOTH_SCAN = 'android.permission.BLUETOOTH_SCAN';
const BLUETOOTH_ADVERTISE = 'android.permission.BLUETOOTH_ADVERTISE';

const permissionsToRequest = [
  ACCESS_FINE_LOCATION,
  BLUETOOTH_CONNECT,
  BLUETOOTH_SCAN,
  BLUETOOTH_ADVERTISE,
];

export default function App() {
  useEffect(() => {
    requestMultiple(permissionsToRequest)
      .then(results => {
        console.log(`permission results ${results}`);
      })
      .catch(error => {
        console.error(`error requesting permissions: ${error}`);
      });
  }, []);

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
