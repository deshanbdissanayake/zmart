import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';

import colors from '../assets/colors/colors';

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <Image
          source={require('../assets/images/app/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.logoText}>WORKMAN</Text>
      </View>
      <View style={styles.welcomeWrapper}>
        <Text style={styles.welcomeTitle}>Welcome</Text>
        <Text style={styles.welcomeDescription}>
          In publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the visual form of a document.
        </Text>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={[styles.buttonStyle, styles.signInButton]}>
            <Text style={[styles.buttonText, styles.signInText]}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonStyle, styles.signUpButton]}>
            <Text style={[styles.buttonText, styles.signUpText]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: colors.white,
  },
  logoWrapper: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  logoText: {
    fontFamily: 'poppins',
    fontWeight: 'bold',
    fontSize: 24,
  },
  welcomeWrapper: {
    flex: 2,
    backgroundColor: '#ffb900',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 20,
  },
  welcomeTitle: {
    fontFamily: 'montserrat',
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 20,
    marginBottom: 20,
  },
  welcomeDescription: {
    fontFamily: 'montserrat',
    fontWeight: 'regular',
    fontSize: 14,
    marginBottom: 40,
  },
  buttonWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonStyle: {
    width: 120,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.textDark,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontFamily: 'montserrat',
    fontWeight: 'bold',
    fontSize: 14,
  },
  signInButton: {
    backgroundColor: colors.bgDark,
    color: colors.white,
  },
  signInText: {
    color: colors.white,
  },
  signUpButton: {
    backgroundColor: colors.bgLight,
  },
  signUpText: {
    color: colors.textDark,
  },
});
