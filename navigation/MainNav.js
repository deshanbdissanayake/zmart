import React, {useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Keyboard } from 'react-native';

// Import your screens or components
import RegistrationScreen from '../screens/RegistrationScreen';

import { log_data } from '../assets/data/system';

// Screens and Navigators
import SplashScreen from '../screens/SplashScreen';
import HomeNav from '../navigation/HomeNav';


// Create a stack navigator
const Stack = createStackNavigator();

function MainNav() {

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
        {!log_data.log_status ? (
            <Stack.Screen
            name="Registration"
            component={RegistrationScreen}
            options={{ headerShown: false }}
        />
        ) : (
            <Stack.Screen
            name="Home"
            component={HomeNav}
            options={{ headerShown: false }}
            />
        )}
      </Stack.Navigator>
  );
}

export default MainNav;
