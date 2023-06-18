import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import Swiper from 'react-native-swiper';

import colors from '../../assets/colors/colors';

const slides = [
  {
    title: 'Title 1',
    subTitle: 'Subtitle 1',
    image: require('../../assets/images/slider/slider-1.jpeg'),
  },
  {
    title: 'Title 2',
    subTitle: 'Subtitle 2',
    image: require('../../assets/images/slider/slider-2.jpeg'),
  },
  {
    title: 'Title 3',
    subTitle: 'Subtitle 3',
    image: require('../../assets/images/slider/slider-3.jpeg'),
  },
];

export default function Slider() {
  const swiperRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (
        swiperRef.current &&
        swiperRef.current.state.index < slides.length - 1
      ) {
        swiperRef.current.scrollBy(1);
      } else {
        swiperRef.current.scrollBy(-slides.length + 1);
      }
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.sliderCard}>
      <Swiper
        ref={swiperRef}
        loop={true}
        showsPagination={true}
        index={0}
        autoplay={true}
        dotStyle={styles.paginationDot}
        activeDotStyle={styles.activePaginationDot}>
        {slides.map((slide, index) => (
          <View key={index} style={styles.slide}>
            <ImageBackground
              source={slide.image}
              style={styles.imageBackground}>
              <Text style={styles.title}>{slide.title}</Text>
              <Text style={styles.subTitle}>{slide.subTitle}</Text>
            </ImageBackground>
          </View>
        ))}
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  sliderCard: {
    height: 150,
    padding: 10,
  },
  slide: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'montserrat',
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subTitle: {
    fontFamily: 'montserrat',
    fontSize: 14,
    color: colors.white,
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
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
    backgroundColor: colors.primary,
    marginHorizontal: 3,
  },
});
