import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Image } from 'react-native';
import { AntDesign, Feather, Ionicons } from 'react-native-vector-icons';
import colors from '../assets/colors/colors';

const Item = ({ orderData }) => {
  console.log(orderData)
  return (
    <View style={styles.itemCardWrapper}>
        <Image source={orderData.pro_img} style={styles.itemCardImgStyles} />
      <View style={styles.itemCardTextStyles}>
        <Text style={styles.itemCardNameStyles}>{orderData.pro_name}</Text>
        <Text style={styles.itemCardPriceStyles}>LKR {(parseFloat(orderData.ord_price)).toFixed(2)}</Text>
      </View>
      <View style={styles.itemCardQtyStyles}>
        <AntDesign name="caretup" size={20} color="black" />
        <TextInput
          value={(parseInt(orderData.ord_qty)).toString()}
          onChange={() => {}}
          style={styles.inputStyle}
        />
        <AntDesign name="caretdown" size={20} color="black" />
      </View>
    </View>
  );
};

const SingleOrderScreen = ({ route }) => {
  const { order } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.orderWrapper}>
        <View style={styles.orderDetailsWrapper}>
          <Text style={styles.titleStyles}>Order Details</Text>
          <View style={styles.orderDetailsStyles}>
            <View style={styles.odTopStyles}>
              <Text style={styles.orderIdStyle}>Order ID : #0001</Text>
              <Text style={styles.orderDateStyle}>2023-06-29 12:45:00</Text>
            </View>
            <View style={styles.odMiddleStyles}>
              <Text>Buyer Name - Buyer Shop</Text>
            </View>
            <View style={styles.odBottomStyles}>
              <TouchableOpacity style={styles.contactButtonStyles} onPress={() => console.log('Call')}>
                <View style={styles.iconStyles}><Feather name="phone-call" size={20} color="black" /></View>
                <Text style={styles.orderNumberStyle}>0714124766</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.contactButtonStyles} onPress={() => console.log('WhatsApp')}>
                <View style={styles.iconStyles}><Ionicons name="logo-whatsapp" size={20} color="black" /></View>
                <Text style={styles.orderNumberStyle}>0714124766</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.titleStyles}>Order Items</Text>
          <View style={styles.orderItemsStyles}>
            <FlatList
              data={order.order_items}
              renderItem={({ item }) => <Item orderData={item}/>}
              keyExtractor={item => item.ordi_id}
            />
          </View>
        </View>
      </View>
    </View>
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
    backgroundColor: 'yellow',
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
    flex: 8,
  },
  itemCardNameStyles: {
    
  },
  itemCardPriceStyles: {
    
  },
  itemCardQtyStyles: {
    flex: 1,
  },
  inputStyle: {
    
  },
});

export default SingleOrderScreen;
