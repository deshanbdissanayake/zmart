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
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from 'react-native-vector-icons';
import colors from '../assets/colors/colors';
import Footer from '../components/footer/Footer';

const SingleProductScreen = ({ route }) => {
  const { propsData } = route.params;

  const [isLoading, setIsLoading] = useState(true);
  const [productData, setProductData] = useState([]);
  const [mainImage, setMainImage] = useState(propsData.product.image1);
  const images = [propsData.product.image1, propsData.product.image2, propsData.product.image3];

  useEffect(() => {
    setProductData(propsData.product);
    setIsLoading(false);
  }, []);

  const handleDelete = () => {
    console.log('Delete')
  }

  const handleEdit = () => {
    console.log('Edit')
  }

  const handleStatus = (currentStatus) => {
    console.log('Change Status - ',currentStatus)
  }

  const changeMainImage = (image) => {
    setMainImage(image);
  };

  const renderLoadingIndicator = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" />
    </View>
  );

  const renderProductList = () => {
    const { status, name, price, qty, desc } = productData;

    const statusStyles = [
      styles.statusStyles,
      status == 'active' ? styles.activeStatusStyles : styles.pauseStatusStyles,
    ];
    const stockColor = qty > 0 ? colors.green : colors.red;

    return (
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={statusStyles}>{status}</Text>
          <View style={styles.topWrapper}>
            <View style={styles.mainImageWrapper}>
              <Image
                style={styles.mainImageStyles}
                source={{ uri: mainImage }}
                alt="main image"
              />
            </View>
            <View style={styles.smallImageWrapper}>
              {images.map((image, index) => (
                <TouchableOpacity key={index} onPress={() => changeMainImage(image)}>
                  <Image
                    style={styles.smallImageStyles}
                    source={{ uri: image }}
                    alt={`image ${index + 1}`}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.bottomWrapper}>
            <Text style={styles.nameStyle}>{name}</Text>
            <View style={styles.priceWrapper}>
              <View style={styles.qtyWrapper}>
                <View style={styles.stockTextWrapper}>
                  <View style={[styles.dotStyle, { backgroundColor: stockColor }]}></View>
                  <Text style={[styles.stockTextStyle, { color: stockColor }]}>
                    {qty > 0 ? 'In Stock' : 'Out of Stock'}
                  </Text>
                </View>
                <Text style={styles.qtyStyle}>Avb Qty : {qty}</Text>
              </View>
              <Text style={styles.priceStyle}>Rs.{parseFloat(price).toFixed(2)}</Text>
            </View>
            <Text style={styles.descStyle}>{desc}</Text>
          </View>
        </ScrollView>

        {propsData.type === 'myProducts' ? (
          <View style={styles.bottomButtonsWrapper}>
            <TouchableOpacity style={styles.bottomButtonStyles} onPress={handleDelete}>
              <Ionicons name="trash-bin" size={24} color={colors.red} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomButtonStyles} onPress={handleEdit}>
              <MaterialCommunityIcons
                name="circle-edit-outline"
                size={24}
                color={colors.secondary}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomButtonStyles} onPress={handleStatus(status)}>
              <Ionicons name={status === 'active' ? 'md-pause-circle' : 'md-play-circle'} size={24} color={colors.secondary} />
            </TouchableOpacity>
          </View>
        ) : (
          <Footer />
        )}
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
    top: 30,
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
  topWrapper: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  mainImageWrapper: {
    height: 250,
    marginBottom: 10,
  },
  mainImageStyles: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.gray,
  },
  smallImageWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallImageStyles: {
    width: 100,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.gray,
  },
  bottomWrapper: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  nameStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 15,
  },
  priceWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
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
  priceStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textDark,
    textAlignVertical: 'center',
    backgroundColor: colors.secondary,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  descStyle: {
    fontSize: 14,
    color: colors.textDark,
    marginBottom: 15,
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
