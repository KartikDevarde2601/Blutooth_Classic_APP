import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/home.screen';
import DetailsScreen from '../screens/details.screen';
import ConnectionScreen from '../screens/connectToDevice.screen';

const Tab = createBottomTabNavigator();

const HomeName = 'Home';
const DetailsName = 'Details';
const ConnectionName = 'Connect';

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={HomeName}
        screenOptions={({route}) => ({
          // tabBarIcon: ({ focused, color, size }) => {
          headerShown: false,
          tabBarIcon: ({color, size, focused}) => {
            let iconName;
            let routeName = route.name;

            if (routeName === HomeName) {
              iconName = focused ? 'home' : 'home-outline';
            } else if (routeName === DetailsName) {
              iconName = focused ? 'list' : 'list-outline';
            } else if (routeName === ConnectionName) {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
          // tabBarActiveTintColor: "tomato",
          // tabBarInactiveTintColor: "gray",
        })}>
        <Tab.Screen name={HomeName} component={HomeScreen} />
        <Tab.Screen name={DetailsName} component={DetailsScreen} />
        <Tab.Screen name={ConnectionName} component={ConnectionScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
