import React, {useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens and Navigators
import ProductListScreen from '../screens/ProductListScreen';
import SingleProductScreen from '../screens/SingleProductScreen';
import AddProductScreen from '../screens/AddProductScreen';
import Header from '../components/header/Header';
import colors from '../assets/colors/colors';


// Create a stack navigator
const Stack = createStackNavigator();

function MyProListNav() {

  return (
      <Stack.Navigator>
        <Stack.Screen
          name="My Products List"
          component={ProductListScreen}
          options={{
            header: ({ navigation }) => (
              <Header navigation={navigation} title="My Products List" />
            ),
          }}
          initialParams={{
            propsData: { type: 'myProducts' },
          }}
        />
        <Stack.Screen
          name="Single Product"
          component={SingleProductScreen} 
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
        <Stack.Screen
          name="Edit Product"
          component={AddProductScreen}
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

export default MyProListNav;
