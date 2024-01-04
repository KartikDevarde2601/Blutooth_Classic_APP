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
  ActivityIndicator,
} from 'react-native';
import RNBluetoothClassic, {
  BluetoothDevice,
} from 'react-native-bluetooth-classic';
import RenderItem from '../components/renderItem.component';

import {useDispatch, useSelector} from 'react-redux';
import {fetchPairedDevices} from '../redux/Slices/devices.Slice';

const ConnectionScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const state = useSelector(state => state.devices);
  const dispatch = useDispatch();

  const pairDevice = () => {
    if (isEnabled) {
      dispatch(fetchPairedDevices());
      console.log('action dispatch');
    }
  };

  useEffect(() => {
    async function checkBluetoothEnabled() {
      const enabled = await RNBluetoothClassic.isBluetoothEnabled();
      setIsEnabled(enabled);
      console.log(`phone Bluetooth is ON/OFF: ${enabled}`);

      if (enabled) {
        pairDevice();
      } else {
        ToastAndroid.show(
          'Bluetooth is OFF, please turn it ON',
          ToastAndroid.SHORT,
        );
      }
    }

    checkBluetoothEnabled();
  }, [isEnabled]);

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
          {state.isLoading ? (
            <ActivityIndicator size="large" color="blue" />
          ) : state.isError ? (
            <Text style={{fontSize: 20, color: 'blue'}}>Error occurred</Text>
          ) : (
            state.devices && (
              <FlatList
                style={{flex: 1}}
                data={state.devices}
                keyExtractor={item => item.id}
                renderItem={RenderItem}
              />
            )
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
