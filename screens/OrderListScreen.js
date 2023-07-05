import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, SafeAreaView, TouchableOpacity, RefreshControl, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

import { useNavigation, useIsFocused  } from '@react-navigation/native';

import colors from '../assets/colors/colors';
import { getMyOrders } from '../assets/data/order';

const OrderItem = ({ order, ordStatus }) => {
  const navigation = useNavigation();

  const handleItemPress = () => {
    navigation.navigate('Single Order', { order , ordStatus })
    //console.log('orderData', refresh);
  };

  return (
    <TouchableOpacity onPress={handleItemPress}>
      <View style={styles.orderItemWrapper}>
        <Text style={styles.orderItemId}>{order.ord_id.toString().padStart(3, '0')}</Text>
        <View style={styles.orderItemTitleWrapper}>
          <Text style={styles.orderItemTitle} numberOfLines={1}>{order.buyer_name}</Text>
          <Text style={styles.orderItemPhone} numberOfLines={1}>{order.buyer_phone}</Text>
          <Text style={styles.orderItemSubTitle}>{order.c_date}</Text>
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
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [ordStatus, setOrdStatus] = useState('active');

  const isFocused = useIsFocused();

  useEffect(() => {
    fetchOrders();
  }, [isFocused, ordStatus]);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await getMyOrders(ordStatus);
      setOrders(response);
    } catch (error) {
      console.log('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setOrdStatus('active');
    fetchOrders();
  };

  const renderLoadingIndicator = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" />
    </View>
  );

  const renderItem = (item) => <OrderItem order={item} ordStatus={ordStatus} />;
    
  const renderOrderList = () => (
    
    <ScrollView
    style={styles.container}
    refreshControl={
      <RefreshControl
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        progressBackgroundColor={colors.background}
      />
    }
  >
    <View style={styles.titleWrapper}>
      <TouchableOpacity onPress={() => setOrdStatus('active')}>
        <Text style={[styles.title, {backgroundColor: ordStatus === 'active' ? colors.secondary : colors.bgLight }]}>New Orders</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setOrdStatus('confirmed')}>
        <Text style={[styles.title, {backgroundColor: ordStatus === 'confirmed' ? colors.secondary : colors.bgLight }]}>Confirmed Orders</Text>
      </TouchableOpacity>
    </View>
    {orders.length !== 0 ? (
      orders.map((order) => renderItem(order))
    ) : (
      <View style={styles.orderErrorWrapper}>
        <Text style={styles.orderErrorText}>No New Orders!</Text>
      </View>
    )}
  </ScrollView>
    
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
    padding: 10,
  },
  titleWrapper:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    padding: 5,
    borderRadius: 5,
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
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: '100%',
    textAlign: 'center',
  },
  orderItemTitleWrapper: {
    flex: 9,
    marginRight: 10,
  },
  orderItemTitle: {
    fontWeight: 'bold',
  },
  orderItemSubTitle: {
    fontSize: 11,
    color: colors.gray,
  },
  iconStyles: {
    flex: 1,
  },
  orderErrorWrapper: {
    backgroundColor: colors.gray,
    paddingVertical: 5,
  },
  orderErrorText: {
    textAlign:'center',
    fontStyle: 'italic'
  },
});

export default OrderListScreen;
