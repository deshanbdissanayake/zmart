import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const SelectedProductsListScreen = () => {
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
      <Text style={styles.title}>Selected Products</Text>
      {selectedProducts.length > 0 ? (
        <FlatList
          data={selectedProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.productItem}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>Rs.{(parseFloat(item.price)).toFixed(2)}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyText}>No products selected</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 18,
    fontStyle: 'italic',
  },
});

export default SelectedProductsListScreen;
