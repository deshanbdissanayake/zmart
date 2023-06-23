import React, {useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens and Navigators
import ProductListScreen from '../screens/ProductListScreen';
import SingleProductScreen from '../screens/SingleProductScreen';
import Header from '../components/header/Header';
import colors from '../assets/colors/colors';

// Create a stack navigator
const Stack = createStackNavigator();

const ProListNav = () => {

  return (
      <Stack.Navigator>
        <Stack.Screen
          name="Product List"
          component={ProductListScreen}
          options={{
            header: ({ navigation }) => (
              <Header navigation={navigation} title="Products List" />
            ),
          }}
          initialParams={{
            propsData: { type: 'productList' },
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
      </Stack.Navigator>
  );
}

export default ProListNav;
