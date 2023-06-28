import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SingleOrderScreen = ({ route }) => {
  const { orderId, orderName } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Details</Text>
      <View style={styles.orderItem}>
        <Text style={styles.label}>Order ID:</Text>
        <Text style={styles.value}>{orderId}</Text>
      </View>
      <View style={styles.orderItem}>
        <Text style={styles.label}>Order Name:</Text>
        <Text style={styles.value}>{orderName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  value: {
    flex: 1,
  },
});

export default SingleOrderScreen;
