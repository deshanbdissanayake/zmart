import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { log_data } from '../assets/data/system';

// Import your screens or components
import RegistrationScreen from '../screens/RegistrationScreen';
import HomeNav from './HomeNav';


// Create a stack navigator
const Stack = createStackNavigator();

function MainNav() {
  return (
      <Stack.Navigator>
        {!log_data.log_status && (
            <Stack.Screen
            name="Registration"
            component={RegistrationScreen}
            options={{ headerShown: false }}
        />
        )} 
          <Stack.Screen
            name="Home"
            component={HomeNav}
            options={{ headerShown: false }} 
          />
       
      </Stack.Navigator>
  );
}

export default MainNav;
