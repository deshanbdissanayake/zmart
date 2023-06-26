// AuthContext.js
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { validateUser } from './assets/data/user'; // Import the user validation function

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const handleLogout = () => {
    clearAsyncStorage();
    setIsAuthenticated(false);
  };

  // Function to clear AsyncStorage
  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage cleared successfully.');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
      // Handle the error appropriately
    }
  };

  // Function to validate the user
  const validateUserAndLogout = async () => {
    try {
      const data = await AsyncStorage.getItem('log_data');
      if (data) {
        const logData = JSON.parse(data);
        console.log(logData)
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

  // Check user validity when the component mounts
  useState(() => {
    validateUserAndLogout();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
