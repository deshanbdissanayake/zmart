import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import colors from '../../assets/colors/colors';
import latestStories from '../../assets/data/latestStories';

const Latest = () => {
  const renderLatestStory = ({ item }) => (
    <TouchableOpacity style={styles.latestItem} key={item.id}>
      <Image style={styles.latestItemImage} source={item.image} />
      <View style={styles.latestItemText}>
        <View style={styles.iconWrapper}>
          <Ionicons name="calendar" size={16} color={colors.secondary} />
          <Text style={styles.iconText}>{item.date}</Text>
        </View>
        <Text style={styles.latestItemTitle}>{item.title}</Text>
        <View style={styles.iconWrapper}>
          <Ionicons name="location" size={16} color={colors.secondary} />
          <Text style={styles.iconText}>{item.place}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.latestWrapper}>
      <Text style={styles.latestTitle}>Latest Items</Text>
      <FlatList
        data={latestStories}
        renderItem={renderLatestStory}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  latestWrapper: {
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  latestTitle: {
    fontFamily: 'montserrat',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  latestItem: {
    backgroundColor: colors.white,
    alignItems: 'center',
    padding: 10,
    width: 160,
    borderRadius: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  latestItemImage: {
    width: 140,
    height: 140,
    resizeMode: 'cover',
    marginBottom: 5,
    borderRadius: 8,
  },
  latestItemText: {
    textAlign: 'left',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
  },
  iconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
    marginTop: 3,
  },
  iconText: {
    fontFamily: 'montserrat',
    fontSize: 10,
    color: colors.gray,
    marginLeft: 5,
  },
  latestItemTitle: {
    overflow: 'hidden',
    textAlign: 'left',
    fontFamily: 'montserrat',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default Latest;
