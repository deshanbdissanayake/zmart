import React, { useState, useEffect, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { log_data } from '../assets/data/system'; //getting dummy data

// Import your screens or components
import RegistrationScreen from '../screens/RegistrationScreen';
import HomeNav from '../navigation/HomeNav';
import SplashScreen from '../screens/SplashScreen';
import AuthContext from '../context/AuthContext';
import { View } from 'react-native';

// Create a stack navigator
const Stack = createStackNavigator();

const AppNav = () => {

    const {isLoading, userStatus} = useContext(AuthContext);

    if(isLoading){
        return (
            <SplashScreen />
        )
    }

  return (
    <NavigationContainer>
        {userStatus !== null ? <HomeNav/> : <RegistrationScreen/>}
    </NavigationContainer>
  );
};

export default AppNav;
