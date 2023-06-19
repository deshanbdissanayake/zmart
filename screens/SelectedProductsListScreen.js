import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  TextInput
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from 'react-native-vector-icons';
import colors from '../assets/colors/colors';
import Header from '../components/header/Header';

const ListItem = ({ item, index }) => {
    const isFirstItem = index === 0;
  
    return (
        <View style={[styles.productItem, isFirstItem && styles.firstProductItem]}>
            <Text style={styles.productName} numberOfLines={3}>{item.name}</Text>
            <Text style={styles.productPrice}>{parseFloat(item.price).toFixed(2)}</Text>
            <TextInput 
                style={[styles.qtyStyles, styles.oldQtyStyles, styles.disabled]} 
                value={item.qty.toString()}  
                editable={false} 
                keyboardType="numeric" 
            />
            <TextInput 
                placeholder="New Qty" 
                style={[styles.qtyStyles, styles.newQtyStyles]} 
                editable={true} 
                keyboardType="numeric"
            />
        </View>
    );
  };
  

const SelectedProductsListScreen = () => {
    const props = {
        type : 'invoice', //invoice, share, stock
        typeName : 'Invoice', // Invoice, Share, Stock Change
    }
  const selectedProducts = [
    {
      id: 1,
      name: 'Organic Superfood Blend with Spirulina, Chlorella, and Wheatgrass',
      desc: 'Description is the pattern of narrative development that aims to make vivid a place, object, character, or group. Description is one of four rhetorical modes, along with exposition, argumentation, and narration. In practice it would be difficult to write literature that drew on just one of the four basic modes.',
      price: 10.99,
      image: require('../assets/images/products/1.jpg'),
      images: [
        require('../assets/images/products/1.jpg'),
        require('../assets/images/products/2.jpg'),
        require('../assets/images/products/3.jpg'),
      ],
      qty: 10,
      user: 1,
      commission: 100.00,
      status: 'active',
    },
    {
      id: 2,
      name: 'Premium Coffee Beans',
      desc: 'Enjoy the rich and aromatic flavor of our premium coffee beans. Sourced from the finest coffee plantations around the world.',
      price: 8.99,
      image: require('../assets/images/products/2.jpg'),
      images: [
        require('../assets/images/products/2.jpg'),
        require('../assets/images/products/4.jpg'),
        require('../assets/images/products/1.jpg'),
      ],
      qty: 20,
      user: 2,
      commission: 75.00,
      status: 'active',
    },
  ];

  return (
    <View style={styles.container}>
        <Header />
        <View style={styles.content}>
            <Text style={styles.title}>Selected Products for {props.typeName}</Text>
            {selectedProducts.length > 0 ? (
                <>
                    <View style={[styles.tRow, styles.tHeaderItem]}>
                        <Text style={[styles.tHeader, styles.tHeaderName]}>Name</Text>
                        <Text style={[styles.tHeader, styles.tHeaderPrice]}>Price</Text>
                        <Text style={[styles.tHeader, styles.tHeaderOldQty]}>Cur Qty</Text>
                        <Text style={[styles.tHeader, styles.tHeaderNewQty]}>New Qty</Text>
                    </View>
                    <FlatList
                        data={selectedProducts}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item, index }) => <ListItem item={item} index={index} />}
                        showsVerticalScrollIndicator={false}
                    />
                    <View style={[styles.tRow, styles.tHeaderItem, styles.totalStyle]}>
                        <Text style={[styles.tHeader, styles.tHeaderName]}>Total</Text>
                        <Text style={[styles.tHeader, styles.tHeaderNewQty]}>Rs.{(parseFloat(10000)).toFixed(2)}</Text>
                    </View>
                </>
            ) : (
                <Text style={styles.emptyText}>No products selected</Text>
            )}
        </View>

        <View style={styles.bottomButtonsWrapper}>
          <TouchableOpacity style={styles.bottomButtonStyles}>
            <Ionicons name="arrow-undo-circle-sharp" size={24} color={colors.red} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomButtonStyles}>
            <Ionicons name="arrow-forward-circle-sharp" size={24} color={colors.secondary} />
          </TouchableOpacity>
        </View>
    </View>
  );
}; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
  },
  firstProductItem:{
    borderTopColor: colors.gray,
    borderTopWidth: 1,
  },
  productName: {
    flex: 6,
    fontSize: 12,
  },
  productPrice: {
    flex: 2,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  qtyStyles:{
    fontSize: 12,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'right',
    paddingVertical: 0,
    paddingHorizontal: 5,
    marginLeft: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.border,
    height: 30,
    color: colors.textDark,
  },
    oldQtyStyles: {
        flex: 2,
    },
    newQtyStyles: {
        flex: 2,
    },
  emptyText: {
    fontSize: 14,
    fontStyle: 'italic',
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
  disabled: {
    backgroundColor: colors.gray,
    color: colors.textDark,
  },

  //====================================================
    tRow : {
        flexDirection: 'row',
    },
    tHeader : {
        color: colors.textDark,
        fontWeight: 'bold',
        fontSize: 12,
    },
    tHeaderName : {
        flex: 6,
    },
    tHeaderPrice : {
        flex: 2,
    },
    tHeaderOldQty : {
        flex: 2,
    },
    tHeaderNewQty : {
        flex: 2,
        textAlign: 'right',
    },
    totalStyle: {
      paddingTop: 10,
      borderTopWidth: 1,
      borderColor: colors.textDark,
      marginBottom: 20,
    },
  //====================================================
});

export default SelectedProductsListScreen;
