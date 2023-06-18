import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import colors from '../../assets/colors/colors';

const Footer = () => {
  return (
    <View style={styles.footerContainer}>
      <Text style={styles.text}>Developed by <Text style={styles.textPrimary}>Introps IT</Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: colors.bgDark,
    padding: 16,
    alignItems: 'center',
  },
  text: {
    color: colors.textLight,
  },
  textPrimary: {
    color : colors.secondary,
  },
});

export default Footer;
