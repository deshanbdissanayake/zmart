import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import categories from '../../assets/data/categories';
import colors from '../../assets/colors/colors';

const Category = () => {
  const displayCategories = categories.slice(0, 8); // Limit the categories to 9 items

  return (
    <View style={styles.categoriesWrapper}>
      <Text style={styles.categoriesTitle}>All Categories</Text>
      <View style={styles.categories}>
        {displayCategories.map((category) => (
          <TouchableOpacity style={styles.categoryItem} key={category.id}>
            <Image style={styles.categoryItemImage} source={category.image} />
            <Text style={styles.categoryItemTitle}>{category.name}</Text>
          </TouchableOpacity>
        ))}
        {categories.length > 7 && (
          <TouchableOpacity style={styles.categoryItem} key="view-more">
            <Image
              style={styles.categoryItemImage}
              source={require('../../assets/images/category/view-more.png')}
            />
            <Text style={styles.categoryItemTitle}>View More</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  categoriesWrapper: {
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  categoriesTitle: {
    fontFamily: 'montserrat',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    backgroundColor: colors.white,
    alignItems: 'center',
    padding: 10,
    width: '30%',
    borderRadius: 5,
    marginBottom: 10,
  },
  categoryItemImage: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
  categoryItemTitle: {
    marginTop: 5,
    overflow: 'hidden',
    fontFamily: 'montserrat',
    fontSize: 12,
  },
});

export default Category;
