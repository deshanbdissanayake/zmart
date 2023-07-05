import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { log_data } from './assets/data/system'; //getting dummy data
import { validateUser } from './assets/data/user'; // Import the user validation function

// Import your screens or components
import RegistrationScreen from './screens/RegistrationScreen';
import HomeNav from './navigation/HomeNav';
import SplashScreen from './screens/SplashScreen';

// Create a stack navigator
const Stack = createStackNavigator();

function App() {
  const [logData, setLogData] = useState(log_data);
  const [loading, setLoading] = useState(true);

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const handleLogout = async () => {
    console.log('logout clicked')
    //await clearAsyncStorage();
    //setIsAuthenticated(false);
  };

  // Function to clear AsyncStorage
  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage cleared successfully.');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  // Function to validate the user
  const validateLoggedUser = async () => {
    try {
      const data = await AsyncStorage.getItem('log_data');
      if (data) {
        const logData = JSON.parse(data);
        //console.log(logData)
        const checkUser = await validateUser(logData.log_userNumber, logData.log_userToken, logData.log_userType);
        if (checkUser) {
          console.log('Valid user');
        } else {
          console.log('Invalid user');
          handleLogout();
        }
      } else {
        console.log('log_data does not exist in AsyncStorage');
      }
    } catch (error) {
      console.error('Error retrieving log_data from AsyncStorage:', error);
    }
  };

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
          const asyncLogData = JSON.parse(data);
          setLogData(asyncLogData);
        } else {
          console.log('log_data does not exist in AsyncStorage')
          setLogData(log_data);
        }
      })
      .catch((error) => {
        console.error('Error retrieving log_data from AsyncStorage:', error);
        setLogData(log_data);
      })
      .finally(()=>{
        setLoading(false);
      });
  }, []);

  //================================================================


  return (
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
            initialParams={{
              handleLogout: handleLogout,
            }}
          />

        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;
