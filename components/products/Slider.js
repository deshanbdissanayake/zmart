import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Swiper from 'react-native-swiper';

import colors from '../../assets/colors/colors';

const Slider = ({ images = [] }) => {
  const swiperRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (
        swiperRef.current &&
        swiperRef.current.state.index < images.length - 1
      ) {
        swiperRef.current.scrollBy(1);
      } else {
        swiperRef.current.scrollBy(-images.length + 1);
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [images]);

  return (
    <View style={styles.sliderCard}>
      <Swiper
        ref={swiperRef}
        loop={true}
        showsPagination={true}
        index={0}
        autoplay={false}
        dotStyle={styles.paginationDot}
        activeDotStyle={styles.activePaginationDot}
      >
        {images.map((image, index) => (
          <View key={index} style={styles.slide}>
            <Image source={image} style={styles.image} />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  sliderCard: {
    height: 250,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  slide: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.white,
    marginHorizontal: 3,
  },
  activePaginationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.secondary,
    marginHorizontal: 3,
  },
});
