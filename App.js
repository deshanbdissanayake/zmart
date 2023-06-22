import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthProvider } from './AuthContext';

import { log_data } from './assets/data/system'; //getting dummy data

// Import your screens or components
import RegistrationScreen from './screens/RegistrationScreen';
import HomeNav from './navigation/HomeNav';
import SplashScreen from './screens/SplashScreen';

// Create a stack navigator
const Stack = createStackNavigator();

function App() {
  const [logData, setLogData] = useState(log_data);
  const [loading, setLoading] = useState(true);

  //================================================================
  // unfocus from text inputs when keyboard hides
  //================================================================
  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      // This will blur the currently focused input field
      Keyboard.dismiss();
    });

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  //================================================================
  // async storage check for data
  //================================================================
  useEffect(() => {
    //AsyncStorage.clear();
    AsyncStorage.getItem('log_data')
      .then((data) => {
        if (data) {
          const logData = JSON.parse(data);
          setLogData(logData)
        } else {
          console.log('log_data does not exist in AsyncStorage')
        }
      })
      .catch((error) => {
        console.error('Error retrieving log_data from AsyncStorage:', error);
      })
      .finally(()=>{
        setLoading(false);
      });
  }, []);

  //================================================================


  return (
    <AuthProvider>
      <NavigationContainer> 
        <Stack.Navigator>
        {loading && (
          <Stack.Screen 
            name="Splash" 
            component={SplashScreen} 
            options={{ headerShown: false }} 
          />
        )}
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
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;
