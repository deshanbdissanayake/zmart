import React, { useEffect } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import colors from '../assets/colors/colors';
import { log_data } from '../assets/data/system';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Simulating a delay before navigating to the next screen
    setTimeout(() => {
      navigation.navigate('Main');
    }, 2000); // Adjust the delay time as needed
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <Image
          source={require('../assets/images/app/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.logoText}>{log_data.sys_name}</Text>
      </View>
      <View style={styles.circleTopRight} />
      <View style={styles.circleBottomLeft} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWrapper:{
    marginBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  logoText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: colors.textDark,
  },
  circleTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 80,
    height: 100,
    borderBottomLeftRadius: 150,
    backgroundColor: colors.secondary,
  },
  circleBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 160,
    height: 180,
    borderTopRightRadius: 250,
    backgroundColor: colors.secondary,
  },
});

export default SplashScreen;
