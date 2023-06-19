import React, {useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Keyboard } from 'react-native';

// Import your screens or components
import HomeScreen from './screens/HomeScreen';
import WelcomeScreen from './screens/WelcomeScreen'; 
import SplashScreen from './screens/SplashScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import AddProductScreen from './screens/AddProductScreen';
import ProductListScreen from './screens/ProductListScreen';
import SingleProductScreen from './screens/SingleProductScreen';
import SelectedProductsListScreen from './screens/SelectedProductsListScreen';

// Create a stack navigator
const Stack = createStackNavigator();

function App() {

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
    <NavigationContainer>
      <Stack.Navigator>
        {/*<Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />*/}
        {/*<Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />*/}
        {/*<Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />*/}
        {/*<Stack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
      />*/}
      {/*<Stack.Screen
          name="Add Product"
          component={AddProductScreen}
          options={{ headerShown: false }}
      />*/}
      {/*<Stack.Screen
          name="Product List"
          component={ProductListScreen}
          options={{ headerShown: false }}
          initialParams={{ propsData: { type : 'productList'} }} 
      />*/}
      {/*<Stack.Screen
          name="My Products"
          component={ProductListScreen}
          options={{ headerShown: false }}
          initialParams={{ propsData: { type : 'myProducts'} }}
      />*/}
      {/*<Stack.Screen
          name="Single Product"
          component={SingleProductScreen}
          options={{ headerShown: false }}
      />*/}
      <Stack.Screen
          name="Selected Product"
          component={SelectedProductsListScreen}
          options={{ headerShown: false }}
      />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
