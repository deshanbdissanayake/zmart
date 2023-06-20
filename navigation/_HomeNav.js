import React, {useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Keyboard } from 'react-native';

// Import your screens or components
import AddProductScreen from '../screens/AddProductScreen';
import ProductListScreen from '../screens/ProductListScreen';
import SingleProductScreen from '../screens/SingleProductScreen';
import SelectedProductsListScreen from '../screens/SelectedProductsListScreen';

import { log_data } from '../assets/data/system';
import colors from '../assets/colors/colors';

// Create a stack navigator
const Stack = createStackNavigator();

function HomeNav() {

  //================================================================
  // unfocus from text inputs when keyboard hides
  //================================================================
  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        // This will blur the currently focused input field
        Keyboard.dismiss();
      }
      );

      return () => {
        keyboardDidHideListener.remove();
      };
    }, []);
  //================================================================

  return (
      <Stack.Navigator>
        <Stack.Screen
            name="Product List"
            component={ProductListScreen}
            options={{ headerShown: false }}
            initialParams={{ propsData: { type : 'productList'} }} 
        /> 
        <Stack.Screen
            name="My Products"
            component={ProductListScreen}
            options={{ headerShown: false }}
            initialParams={{ propsData: { type : 'myProducts'} }}
        />
        <Stack.Screen
          name="Single Product"
          component={SingleProductScreen}
          options={{
              headerTitle : 'Single Product',
              headerStyle: {
                  backgroundColor: colors.bgDark,
              },
              headerTintColor: colors.white,
              headerShown: true
          }}
        />
        <Stack.Screen
            name="Add Product"
            component={AddProductScreen}
            options={{ headerShown: true }}
        />
        <Stack.Screen
            name="Selected Product"
            component={SelectedProductsListScreen}
            options={{ headerShown: true }}
        />
      </Stack.Navigator>
  );
}

export default HomeNav;
