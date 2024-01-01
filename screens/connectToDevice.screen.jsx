import React from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ToastAndroid,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import RNBluetoothClassic, {
  BluetoothDevice,
} from 'react-native-bluetooth-classic';
import {Platform, PermissionsAndroid} from 'react-native';
import renderItem from '../components/renderItem.component';
import {useDispatch, useSelector} from 'react-redux';
import {setDevices} from '../redux/reducers/devices.js';
import RenderItem from '../components/renderItem.component';

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

requestMultiple(permissionsToRequest)
  .then(results => {
    console.log(results);
  })
  .catch(error => {
    console.error(`error requesting permissions: ${error}`);
  });

const ConnectionScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    async function checkBluetoothEnabled() {
      const enabled = await RNBluetoothClassic.isBluetoothEnabled();
      setIsEnabled(enabled);
      console.log(`phone Bluetooth is ON/OFF: ${enabled}`);

      if (!enabled) {
        ToastAndroid.show(
          'Bluetooth is OFF, please turn it ON',
          ToastAndroid.SHORT,
        );
      }
    }

    const PairDevice = async () => {
      const devices = await RNBluetoothClassic.getBondedDevices();
      setDevices(devices);
    };

    checkBluetoothEnabled();
    PairDevice();
  }, []);

  const startScanning = async () => {
    try {
      console.log('start scanning');
      const DiscoverDevices = await RNBluetoothClassic.startDiscovery();
      console.log(`DiscoverDevices: ${JSON.stringify(DiscoverDevices)}`);
      // Do something with the discovered devices
    } catch (error) {
      console.error(error);
    } finally {
      await RNBluetoothClassic.cancelDiscovery();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.textContainar}>
          <Text style={styles.Text}>Connected To Device</Text>
          <TouchableOpacity
            onPress={() => {
              startScanning();
            }}>
            <Text style={styles.ScanText}>Scan</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.listContainer}>
          {isEnabled && (
            <FlatList
              style={{flex: 1}}
              data={devices}
              keyExtractor={item => item.id}
              renderItem={RenderItem}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textContainar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  Text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
  },
  ScanText: {
    fontSize: 20,
    fontWeight: '400',
  },
  listContainer: {
    flex: 1,
    position: 'relative',
  },
});

export default ConnectionScreen;
