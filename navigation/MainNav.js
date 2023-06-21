import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { log_data } from '../assets/data/system'; //getting dummy data

// Import your screens or components
import RegistrationScreen from '../screens/RegistrationScreen';
import HomeNav from './HomeNav';


// Create a stack navigator
const Stack = createStackNavigator();

function MainNav() {
  const [logData, setLogData] = useState(log_data);

  //================================================================
  // async storage check for data
  //================================================================
  useEffect(() => {
    //AsyncStorage.clear();
    AsyncStorage.getItem('log_data')
      .then((data) => {
        if (data) {
          const logData = JSON.parse(data);
          console.log(logData)
          setLogData(logData)
        } else {
          console.log('log_data does not exist in AsyncStorage')
        }
      })
      .catch((error) => {
        console.error('Error retrieving log_data from AsyncStorage:', error);
        //AsyncStorage.clear(); 
      });
  }, []);

  //================================================================

  return (
      <Stack.Navigator>
        {!logData.log_status && (
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
