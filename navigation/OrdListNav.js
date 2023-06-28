import React, {useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens and Navigators
import Header from '../components/header/Header';
import colors from '../assets/colors/colors';
import OrderListScreen from '../screens/OrderListScreen';
import SingleOrderScreen from '../screens/SingleOrderScreen';

// Create a stack navigator
const Stack = createStackNavigator();

const OrdListNav = () => {

  return (
      <Stack.Navigator>
        <Stack.Screen
          name="Order List"
          component={OrderListScreen}
          options={{
            header: ({ navigation }) => (
              <Header navigation={navigation} title="Order List" />
            ),
          }}
        />
        <Stack.Screen
          name="Single Order"
          component={SingleOrderScreen}
          options={{
            headerStyle: {
              backgroundColor: colors.bgDark,
            },
            headerTitleStyle: {
              color: colors.textLight,
            },
            headerTintColor: colors.secondary,
            headerShown: true,
          }}
        />
      </Stack.Navigator>
  );
}

export default OrdListNav;
