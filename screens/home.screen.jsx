import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBluetooth} from '@fortawesome/free-brands-svg-icons/faBluetooth';

const HomeScreen = () => {
  const [value, setValue] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.logoText}>Ihub-Data</Text>
        <View style={styles.BluetoothContainer}>
          <FontAwesomeIcon icon={faBluetooth} color="green" size={25} />
        </View>
      </View>
      <ScrollView style={styles.scrollContainer}>
        <Text>Logs</Text>
      </ScrollView>
      <View style={styles.buttom}>
        <TextInput
          placeholder="Enter Commands"
          onChangeText={text => onChangeText(text)}
          value={value}
          style={styles.input}
        />
        <Button
          title="Press me"
          color="#fa5043"
          onPress={() => Alert.alert('Button with adjusted color pressed')}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    alignItems: 'center',
    marginBottom: 10,
  },
  BluetoothContainer: {
    marginRight: 10,
  },
  logoText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollContainer: {
    flex: 1,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
  },
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fa5043',
    borderRadius: 10,
    margin: 20,
  },
});

export default HomeScreen;
