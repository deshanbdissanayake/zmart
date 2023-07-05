// AuthContext.js
import React, { useState, createContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { validateUser } from '../assets/data/user'; // Import the user validation function
import { log_data } from '../assets/data/system';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [logData, setLogData] = useState(log_data);
  const [userStatus, setUserStatus] = useState(null);

  const isLogedIn = async () => {
    await getDataFromAsyncStorage();
  }

  const logout = async () => {
    await clearAsyncStorage();
  }

  const saveAsyncStorage = async (asyncData) => {
    setIsLoading(true);
    try {
      const logDataString = JSON.stringify(asyncData);
      setLogData(asyncData);
      setUserStatus(asyncData.log_userStatus);
      await AsyncStorage.setItem('log_data', logDataString);
      console.log('log_data saved to AsyncStorage');
    } catch (error) {
      console.error('Error saving log_data to AsyncStorage:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getDataFromAsyncStorage = async () => {
    setIsLoading(true);
    try {
      let data = await AsyncStorage.getItem('log_data');
      const asyncLogData = JSON.parse(data);

      //user database validation
      if(asyncLogData !== null){
        const checkUser = await validateUser(asyncLogData.log_userNumber, asyncLogData.log_userToken, asyncLogData.log_userType);
        if (checkUser) {
          console.log('Valid user');
          setLogData(asyncLogData);
          setUserStatus(asyncLogData.log_userStatus);
        } else {
          console.log('Invalid user');
        }
      }
    } catch (error) {
      console.error('Error retrieving log_data from AsyncStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }

  // Function to clear AsyncStorage
  const clearAsyncStorage = async () => {
    setIsLoading(true);
    try {
      setLogData(log_data)
      setUserStatus(null);
      await AsyncStorage.clear();
      console.log('AsyncStorage cleared successfully.');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    } finally {
      setIsLoading(false)
    }
  };

  // Check user validity when the component mounts
  useEffect(() => {
    isLogedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ saveAsyncStorage, logout, isLoading, logData, userStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
