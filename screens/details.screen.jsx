import React from 'react';
import {View, Text, SafeAreaView, ToastAndroid, StyleSheet} from 'react-native';

const DetailsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.Text}>Details Screen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  Text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'red',
  },
});

export default DetailsScreen;
