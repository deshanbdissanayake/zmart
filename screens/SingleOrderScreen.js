import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Alert } from 'react-native';
import { AntDesign, Feather, Ionicons, Fontisto } from 'react-native-vector-icons';
import colors from '../assets/colors/colors';

const Item = ({ orderData, refresh, updateTotal  }) => {
  const { ord_qty, pro_img, pro_name, ord_price } = orderData;
  const [qty, setQty] = useState(ord_qty.toString());
  const [order, setOrder] = useState(orderData);

  useEffect(() => {
    setQty(ord_qty.toString());
    setOrder(orderData);
  }, [refresh]);

  useEffect(() => {
    const itemTotal = parseFloat(ord_price) * (parseFloat(qty) - parseFloat(ord_qty))
    updateTotal(itemTotal);
  }, [qty]);

  const handleQty = (text) => {
    const ord_qty = text !== '' ? text : 0;
    setQty(ord_qty);
    setOrder((prev) => ({ ...prev, ord_qty }));
  };

  const handleIncreaseQty = useCallback(() => {
    setQty((prevQty) => {
      const qtyAmt = parseInt(prevQty) + 1;
      setOrder((prev) => ({ ...prev, ord_qty: qtyAmt.toString() }));
      return qtyAmt.toString();
    });
  }, []);

  const handleDecreaseQty = useCallback(() => {
    setQty((prevQty) => {
      const qtyAmt = parseInt(prevQty) - 1;
      const newQty = qtyAmt >= 0 ? qtyAmt.toString() : '0';
      setOrder((prev) => ({ ...prev, ord_qty: newQty }));
      return newQty;
    });
  }, []);

  return (
    <View style={styles.itemCardWrapper}>
      <Image source={pro_img} style={styles.itemCardImgStyles} />
      <View style={styles.itemCardTextStyles}>
        <Text style={styles.itemCardNameStyles} numberOfLines={2}>
          {pro_name}
        </Text>
        <Text style={styles.itemCardPriceStyles}>LKR {parseFloat(ord_price).toFixed(2)}</Text>
      </View>
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
    </View>
  );
};

const SingleOrderScreen = ({ navigation, route }) => {
  const { order } = route.params;
  const orderItems = order.order_items;
  const [refresh, setRefresh] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0.00);
  const [initialTotalAmount, setInitialTotalAmount] = useState(0.00);

  const updateTotalAmount = (itemTotal) => {
    const initialTotal = initialTotalAmount;
    
    setTotalAmount(initialTotal + itemTotal);
  };

  useEffect(() => {
    // Calculate the initial total amount
    let initialTotal = 0.00;
    orderItems.forEach((item) => {
      initialTotal += parseFloat(item.ord_price) * parseFloat(item.ord_qty);
    });
    //console.log(initialTotal)
    setTotalAmount(initialTotal);
    setInitialTotalAmount(initialTotal);
  }, []);

  const toggleRefresh = () => {
    setRefresh(prevStt => !prevStt);
  };

  const handleConfirm = () => {
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
          onPress: () => {
            console.log('confirm');
            navigation.goBack();
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
                <Text style={styles.orderIdStyle}>Order ID: #0001</Text>
                <Text style={styles.orderDateStyle}>2023-06-29 12:45:00</Text>
              </View>
              <View style={styles.odMiddleStyles}>
                <Text>Buyer Name - Buyer Shop</Text>
              </View>
              <View style={styles.odBottomStyles}>
                <TouchableOpacity style={styles.contactButtonStyles} onPress={handleCallPress}>
                  <View style={styles.iconStyles}>
                    <Feather name="phone-call" size={20} color="black" />
                  </View>
                  <Text style={styles.orderNumberStyle}>0714124766</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.contactButtonStyles} onPress={handleWtspPress}>
                  <View style={styles.iconStyles}>
                    <Ionicons name="logo-whatsapp" size={20} color="black" />
                  </View>
                  <Text style={styles.orderNumberStyle}>0714124766</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.titleStyles}>Order Items</Text>
            <View>
              {orderItems.map((item) => (
                <Item key={item.ordi_id} orderData={item} refresh={refresh} updateTotal={updateTotalAmount} />
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
    fontSize: 20,
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
