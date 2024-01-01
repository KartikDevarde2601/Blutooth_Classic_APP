import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMicrochip} from '@fortawesome/free-solid-svg-icons/faMicrochip';
import {faHeadset} from '@fortawesome/free-solid-svg-icons/faHeadset';
import {useState} from 'react';

import RNBluetoothClassic, {
  BluetoothDevice,
} from 'react-native-bluetooth-classic';

const RenderItem = ({item}) => {
  const connectToDevice = async address => {
    try {
      console.log('Connecting to device', address);
      let stringAddress = address.toString();

      const device = await RNBluetoothClassic.pairDevice({
        address: stringAddress,
      });
      console.log('Connected to device', device);
      // Handle successful connection
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TouchableOpacity onPress={() => connectToDevice(item.address)}>
      <View style={styles.container}>
        <View style={styles.icon}>
          {item.deviceClass.majorClass === 1024 ? (
            <FontAwesomeIcon icon={faHeadset} size={25} color="#808080" />
          ) : (
            <FontAwesomeIcon icon={faMicrochip} size={25} color="#808080" />
          )}
        </View>
        <View style={styles.deviceNameWrap}>
          <Text style={styles.deviceName}>
            {item.name ? item.name : item.id}
          </Text>
          <Text style={styles.deviceAddress}>{item.address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    margin: 10,
    marginRight: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },

  deviceNameWrap: {
    flex: 1,
    flexDirection: 'column',
    margin: 10,
  },
  deviceName: {
    fontSize: 18,
    color: 'black',
  },
  deviceAddress: {
    fontSize: 14,
    color: 'grey',
  },
});

export default RenderItem;
