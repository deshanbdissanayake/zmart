import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { AntDesign, Feather, Ionicons, Fontisto } from 'react-native-vector-icons';
import colors from '../assets/colors/colors';

import { confirmOrder } from '../assets/data/order';

const Item = ({ orderData, refresh, setOrder, ordStatus }) => {
  //console.log(orderData)
  const { ord_qty, pro_img, pro_name, ord_price } = orderData;
  const [qty, setQty] = useState(ord_qty.toString());
  const [ord, setOrd] = useState(orderData);

  useEffect(() => {
    setQty(ord_qty.toString());
    setOrd(orderData);
  }, [refresh]);

  useEffect(() => {
    setOrder(ord)
  },[qty, setOrder])

  const handleQty = (text) => {
    const ordQty = text !== '' ? text.toString() : '0';
    setQty(ordQty);
    setOrd((prev) => ({ ...prev, ord_qty : ordQty }));
  };

  const handleIncreaseQty = useCallback(() => {
    setQty((prevQty) => {
      const qtyAmt = parseInt(prevQty) + 1;
      setOrd((prev) => ({ ...prev, ord_qty: qtyAmt.toString() }));
      return qtyAmt.toString();
    });
  }, []);

  const handleDecreaseQty = useCallback(() => {
    setQty((prevQty) => {
      const qtyAmt = parseInt(prevQty) - 1;
      const newQty = qtyAmt >= 0 ? qtyAmt.toString() : '0';
      setOrd((prev) => ({ ...prev, ord_qty: newQty }));
      return newQty;
    });
  }, []);

  return (
    <View style={styles.itemCardWrapper}>
      <Image source={{ uri: pro_img }} style={styles.itemCardImgStyles} />
      <View style={styles.itemCardTextStyles}>
        <Text style={styles.itemCardNameStyles} numberOfLines={2}>
          {pro_name}
        </Text>
        <Text style={styles.itemCardPriceStyles}>LKR {parseFloat(ord_price).toFixed(2)}</Text>
      </View>
      {ordStatus === 'active' ? (
          <View style={styles.itemCardQtyStyles}>
            <TouchableOpacity onPress={handleIncreaseQty}>
              <AntDesign name="caretup" size={20} color="black" />
            </TouchableOpacity>
            <TextInput
              value={qty}
              onChangeText={handleQty}
              style={styles.inputStyle}
              keyboardType="number-pad"
            />
            <TouchableOpacity onPress={handleDecreaseQty}>
              <AntDesign name="caretdown" size={20} color="black" />
            </TouchableOpacity>
          </View>
        ) : (
            <View style={styles.itemCardQtyStyles}>
              <TextInput
                value={qty}
                style={styles.inputStyle}
                keyboardType="number-pad"
                editable={false}
                color={colors.black}
              />
            </View>
        )}
      
    </View>
  );
};

const SingleOrderScreen = ({ navigation, route }) => {
  const orderDetails = route.params.order;
  const ordStatus = route.params.ordStatus;

  const [refresh, setRefresh] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0.00);
  const [orderItems, setOrderItems] = useState(orderDetails.order_items)
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const updatedOrderItems = [...orderItems];
    const index = updatedOrderItems.findIndex(item => item.ordi_id === order.ordi_id);

    if (index !== -1) {
      updatedOrderItems[index] = order;
    }

    setOrderItems(updatedOrderItems);
    calculateTotal(updatedOrderItems);
    
  }, [order]);

  const calculateTotal = (updatedOrderItems) => {
    let initialTotal = 0;
    updatedOrderItems.forEach((item) => {
        initialTotal += parseFloat(item.ord_price) * parseFloat(item.ord_qty);
    });
    setTotalAmount(initialTotal);
  };


  const toggleRefresh = () => {
    setRefresh((prevStt) => !prevStt);
    setOrderItems(orderDetails.order_items);
    setOrder(orderItems);
  };

  const handleConfirm = async () => {
    Alert.alert(
      'Confirm the Order',
      'Are you sure you want to confirm?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: async () => {
            setLoading(true);
              
            try {
              const formData = new FormData();
    
              orderItems.forEach((e) => {
                formData.append(`ord_qty[${e.ordi_id}]`, e.ord_qty);
              });
              formData.append(`ord_id`, orderItems[0].ord_id);

              const response = await confirmOrder(formData);

              if (response.stt === 'ok') {

                Alert.alert('Success', response.msg, [
                  { text: 'OK', onPress: () => navigation.goBack({ refresh: true }) },
                ]);

              } else {
      
                Alert.alert('Error', response.msg, [
                  { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
      
              }

            } catch (error) {
              Alert.alert('Error', 'Failed to confirm order.');
            } finally {
              setLoading(false);
            }
            
          },
        },
      ],
      { cancelable: false }
    );
  };
  
  const handleCallPress = () => {
    console.log('call');
  };

  const handleWtspPress = () => {
    console.log('wtsp');
  };

  return (
    <>
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.orderWrapper}>
          <View style={styles.orderDetailsWrapper}>
            <Text style={styles.titleStyles}>Order Details</Text>
            <View style={styles.orderDetailsStyles}>
              <View style={styles.odTopStyles}>
                <Text style={styles.orderIdStyle}>Order ID: #{orderDetails.ord_id}</Text>
                <Text style={styles.orderDateStyle}>{orderDetails.c_date}</Text>
              </View>
              <View style={styles.odMiddleStyles}>
                <Text>{orderDetails.buyer_name} - {orderDetails.buyer_shop}</Text>
              </View>
              <View style={styles.odBottomStyles}>
                <TouchableOpacity style={styles.contactButtonStyles} onPress={handleCallPress}>
                  <View style={styles.iconStyles}>
                    <Feather name="phone-call" size={20} color="black" />
                  </View>
                  <Text style={styles.orderNumberStyle}>{orderDetails.buyer_phone}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.contactButtonStyles} onPress={handleWtspPress}>
                  <View style={styles.iconStyles}>
                    <Ionicons name="logo-whatsapp" size={20} color="black" />
                  </View>
                  <Text style={styles.orderNumberStyle}>{orderDetails.buyer_whtsp}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.titleStyles}>Order Items</Text>
            <View>
              {orderItems.map((item) => (
                <Item key={item.ordi_id} orderData={item} refresh={refresh} setOrder={setOrder} ordStatus={ordStatus} />
              ))}
            </View>
          </View>
          <View style={styles.totalWrapper}>
            <Text style={styles.totalTitle}>Total Amount </Text>
            <Text style={styles.totalAmount}>LKR {totalAmount.toFixed(2)}</Text>
          </View>
        </View>
      </View>
    </ScrollView>

    {ordStatus === 'active' && !loading && (
      <View style={styles.bottomButtonsWrapper}>
        <TouchableOpacity style={styles.bottomButtonStyles} onPress={toggleRefresh}>
          <Text style={styles.bottomButtonText}>Reset</Text>
          <Fontisto name="undo" size={24} color={colors.red} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButtonStyles} onPress={handleConfirm}>
          <Text style={styles.bottomButtonText}>Confirm</Text>
          <Ionicons name="checkmark-circle" size={24} color={colors.secondary} />
        </TouchableOpacity>
      </View>
    )}

    {ordStatus === 'active' && loading && (
      <View style={styles.bottomButtonsActivityIndicator}>
        <ActivityIndicator />
      </View>
    )}

    {ordStatus !== 'active' && (
      <View style={styles.bottomButtonsActivityIndicator}></View>
    )}

    
    
  </>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  orderWrapper: {
    flex: 1,
  },
  titleStyles: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  orderDetailsWrapper: {
    marginBottom: 15,
  },
  orderDetailsStyles: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  odTopStyles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderIdStyle: {
    fontWeight: 'bold',
  },
  orderDateStyle: {
    fontSize: 11,
    color: colors.gray,
  },
  odMiddleStyles: {
    marginBottom: 10,
  },
  odBottomStyles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contactButtonStyles: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyles: {
    backgroundColor: colors.secondary,
    padding: 5,
    marginRight: 5,
    borderRadius: 5,
  },
  orderNumberStyle: {
    textDecorationLine: 'underline',
  },
  itemCardWrapper: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.border,
    flexDirection: 'row',
    height: 90,
  },
  itemCardImgStyles: {
    flex: 3,
    backgroundColor: colors.gray,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 10,
    marginRight: 10,
  },
  itemCardTextStyles: {
    flex: 7,
    justifyContent: 'space-between',
    marginRight: 10,
  },
  itemCardNameStyles: {
    fontWeight: 'semibold',
    marginLeft: 3,
  },
  itemCardPriceStyles: {
    width: 100,
    backgroundColor: colors.secondary,
    textAlign: 'center',
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  itemCardQtyStyles: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputStyle: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.border,
    width: 50,
    padding: 0,
    textAlign: 'center',
  },
  totalWrapper: {
    flexDirection: 'row',
    marginTop: 10,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    borderBottomWidth: 3,
    borderBottomColor: colors.border,
  },
  totalTitle: {
    fontSize: 16,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomButtonsActivityIndicator:{
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: colors.bgDark,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  bottomButtonsWrapper: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: colors.bgDark,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  bottomButtonStyles: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  bottomButtonText: {
    marginRight: 10,
    fontWeight: 'bold',
    color: colors.white,
    fontSize: 12,
  },
});

export default SingleOrderScreen;
