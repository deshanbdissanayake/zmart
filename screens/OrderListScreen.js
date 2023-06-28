import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from 'react-native-vector-icons';

import colors from '../assets/colors/colors';
import Footer from '../components/footer/Footer';
import { getMyOrders } from '../assets/data/order';

const OrderItem = ({ order }) => {
    const handleItemPress = () => {
      console.log('orderData', order);
    };
  
    return (
      <TouchableOpacity onPress={handleItemPress}>
        <View style={styles.orderItemWrapper}>
          <Text style={styles.orderItemId}>{order.ord_id.toString().padStart(3, '0')}</Text>
          <View style={styles.orderItemTitleWrapper}>
            <Text style={styles.orderItemTitle} numberOfLines={1}>Buyeasdfsdfr Nams</Text>
            <Text style={styles.orderItemPhone} numberOfLines={1}>0714578456</Text>
            <Text style={styles.orderItemSubTitle}>2023-06-28 13:30:00</Text>
          </View>
          <MaterialCommunityIcons
                style={styles.iconStyles}
                name="chevron-double-right"
                size={24}
                color="black"
              />
        </View>
      </TouchableOpacity>
    );
  };
  
const OrderListScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await getMyOrders();
      setOrders(response);
    } catch (error) {
      console.log('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderLoadingIndicator = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" />
    </View>
  );

  const renderItem = ({ item }) => <OrderItem order={item} />;

  const renderOrderList = () => (
    <View style={styles.container}>
      <Text style={styles.title}>Order List</Text>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => item.ord_id.toString()}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? renderLoadingIndicator() : renderOrderList()}
    </SafeAreaView>
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    orderItemWrapper: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: 8,
        borderRadius: 8,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    orderItemId: {
        flex: 2,
        marginRight: 10,
        backgroundColor: colors.secondary,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
        width: '100%',
        textAlign: 'center',
    },
    orderItemTitleWrapper:{
        flex: 9,
        marginRight: 10,
    },
    orderItemTitle:{

    },
    orderItemPhone: {

    },
    orderItemSubTitle:{
        fontSize: 11,
        color: colors.gray,
    },
    iconStyles: {
        flex: 1,
    },
    
});

export default OrderListScreen;
