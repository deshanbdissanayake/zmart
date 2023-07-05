import React, { useEffect } from 'react';
import { Keyboard } from 'react-native';

import { AuthProvider } from './context/AuthContext';
import AppNav from './navigation/AppNav';

const App = () => {

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

  return (
    <AuthProvider>
      <AppNav/>
    </AuthProvider>
  );
}

export default App;
