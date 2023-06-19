import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from 'react-native-vector-icons';
import colors from '../assets/colors/colors';
import Header from '../components/header/Header';
import { getProductByProId } from '../assets/data/product';
import Slider from '../components/products/Slider';
import { ScrollView } from 'react-native-gesture-handler';

const SingleProductScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    fetchProductData();
  }, []);

  const fetchProductData = async () => {
    setIsLoading(true);
    try {
      const response = await getProductByProId(1);
      setProductData(response);
    } catch (error) {
      console.log('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderLoadingIndicator = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" />
    </View>
  );

  const renderProductList = () => {
    const {
      status,
      images,
      name,
      price,
      qty,
      desc
    } = productData;

    const statusStyles = [styles.statusStyles, status == 'active' ? styles.activeStatusStyles : styles.pauseStatusStyles];
    const stockColor = qty > 0 ? colors.green : colors.red;

    return (
      <View style={styles.content}>

        <Header />

        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={statusStyles}>{status}</Text>
          <Slider images={images} />
          <View style={styles.bottomWrapper}>
            <Text style={styles.nameStyle}>{name}</Text>
            <View style={styles.priceWrapper}>
                <View style={styles.qtyWrapper}>
                    <View style={styles.stockTextWrapper}>
                    <Text style={[styles.stockTextStyle, { color: stockColor }]}>
                        {qty > 0 ? 'In Stock' : 'Out of Stock'}
                    </Text>
                    <View style={[styles.dotStyle, { backgroundColor: stockColor }]}></View>
                    </View>
                    <Text style={styles.qtyStyle}>Avb Qty : {qty}</Text>
                </View>
                <View style={styles.middleBorder}></View>
                <Text style={styles.priceStyle}>Rs.{parseFloat(price).toFixed(2)}</Text>
            </View>
            <Text style={styles.descStyle}>{desc}</Text>
          </View>
        </ScrollView>

        <View style={styles.bottomButtonsWrapper}>
          <TouchableOpacity style={styles.bottomButtonStyles}><Ionicons name="trash-bin" size={24} color={colors.red} /></TouchableOpacity>
          <TouchableOpacity style={styles.bottomButtonStyles}><MaterialCommunityIcons name="circle-edit-outline" size={24} color={colors.secondary} /></TouchableOpacity>
          <TouchableOpacity style={styles.bottomButtonStyles}><Ionicons name="md-pause-circle" size={24} color={colors.secondary} /></TouchableOpacity>
          {/*<TouchableOpacity><Ionicons name="md-play-circle" size={24} color={colors.secondary} /></TouchableOpacity>*/}
        </View>

      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? renderLoadingIndicator() : renderProductList()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: colors.bgLight,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusStyles: {
    position: 'absolute',
    zIndex: 10,
    right: 30,
    top: 20,
  },
  activeStatusStyles: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: colors.green,
    color: colors.textLight,
    fontWeight: 'bold',
    borderRadius: 10,
  },
  pauseStatusStyles: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: colors.red,
    color: colors.textLight,
    fontWeight: 'bold',
    borderRadius: 10,
  },
  bottomWrapper: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  nameStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 10,
    textAlign: 'justify',
  },
  priceWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  qtyWrapper: {
    flexDirection: 'column',
  },
  stockTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dotStyle: {
    width: 8,
    height: 8,
    borderRadius: 10,
  },
  qtyStyle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.gray,
  },
  middleBorder: {
    borderRightWidth: 1,
    borderColor: colors.gray,
  },
  priceStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textDark,
    textAlignVertical: 'center',
  },
  descStyle: {
    fontSize: 14,
    color: colors.textDark,
    marginBottom: 5,
    textAlign: 'justify',
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
});

export default SingleProductScreen;