import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from 'react-native-vector-icons';

import colors from '../assets/colors/colors';
import Footer from '../components/footer/Footer';
import ProductItem from '../components/products/ProductItem';
import { getProducts } from '../assets/data/product';

const ProductListScreen = ({ route }) => {
  const { propsData } = route.params;

  const title = propsData.type === 'myProducts' ? 'My Product List' : 'All Suppliers Products';

  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [proListTitle, setProListTitle] = useState(title);
  const [selectedCount, setSelectedCount] = useState(0);

  const checkCountFunc = (n) => {
    console.log(n)
    if(n == 0){
      setSelectedCount(0)
    }else{
      setSelectedCount(selectedCount + parseInt(n))
    }
  }

  const [propsForItems, setPropsForItems] = useState({
    shareBtnClicked: false,
    invoiceBtnClicked: false,
    stockBtnClicked: false,
    checkCountFunc : checkCountFunc,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await getProducts();
      setProducts(response);
    } catch (error) {
      console.log('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShareBtnClick = () => {
    setPropsForItems({
      ...propsForItems,
      shareBtnClicked: true,
    });
    setProListTitle('Share My Products');
  };

  const handleInvoiceBtnClick = () => {
    setPropsForItems({
      ...propsForItems,
      invoiceBtnClicked: true,
    });
    setProListTitle('Invoice My Products');
  };

  const handleStockBtnClick = () => {
    setPropsForItems({
      ...propsForItems,
      stockBtnClicked: true,
    });
    setProListTitle('My Products Stock Update');
  };

  const handleCancelBtnClick = () => {
    setPropsForItems({
      ...propsForItems,
      shareBtnClicked: false,
      invoiceBtnClicked: false,
      stockBtnClicked: false,
    });
    setSelectedCount(0);
    setProListTitle(title);
  };

  const handleNextBtnClick = () => {
    console.log('button clicked');
  };

  const renderLoadingIndicator = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" />
    </View>
  );

  const renderProductList = () => (
    <View style={styles.content}>
      {/*<Header />*/}
      <View style={styles.searchWrapper}>
        <TextInput
          style={styles.searchText}
          placeholder="Search Products Here"
          keyboardType="default"
          maxLength={15}
          value={search}
          onChangeText={setSearch}
        />
        <View style={styles.searchIcon}>
          <Ionicons name="search" size={24} color={colors.textDark} />
        </View>
      </View>

      <View style={styles.proListWrapper}>
        <View style={styles.proListTitleWrapper}>
          <Text style={styles.proListTitle}>{proListTitle}</Text>
          {selectedCount > 0 ? (<Text>{selectedCount} Selected</Text>):''}
        </View>

        <FlatList
          data={products}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ProductItem product={item} props={propsForItems} />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {propsData.type === 'myProducts' ? (
        (propsForItems.shareBtnClicked ||
          propsForItems.invoiceBtnClicked ||
          propsForItems.stockBtnClicked) ? (
          <View style={styles.bottomButtonsWrapper}>
            <TouchableOpacity
              style={styles.bottomButtonStyles}
              onPress={handleCancelBtnClick}
            >
              {/*<Text style={styles.bottomButtonText}>Cancel</Text>*/}
              <Ionicons name="close" size={24} color={colors.red} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomButtonStyles}
              onPress={handleNextBtnClick}
            >
              {/*<Text style={styles.bottomButtonText}>
                {propsForItems.shareBtnClicked
                  ? 'Share'
                  : propsForItems.invoiceBtnClicked
                  ? 'Invoice'
                  : 'Stock'}
              </Text>*/}
              {propsForItems.shareBtnClicked ? (
                <Ionicons
                  name="share-social-sharp"
                  size={24}
                  color={colors.secondary}
                />
              ) : propsForItems.invoiceBtnClicked ? (
                <MaterialCommunityIcons
                  name="file-document-outline"
                  size={24}
                  color={colors.secondary}
                />
              ) : (
                <MaterialCommunityIcons
                  name="format-list-bulleted"
                  size={24}
                  color={colors.secondary}
                />
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.bottomButtonsWrapper}>
            <TouchableOpacity
              style={styles.bottomButtonStyles}
              onPress={handleStockBtnClick}
            >
              {/*<Text style={styles.bottomButtonText}>Stock</Text>*/}
              <MaterialCommunityIcons
                name="format-list-bulleted"
                size={24}
                color={colors.secondary}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomButtonStyles}
              onPress={handleShareBtnClick}
            >
              {/*<Text style={styles.bottomButtonText}>Share</Text>*/}
              <Ionicons
                name="share-social-sharp"
                size={24}
                color={colors.secondary}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomButtonStyles}
              onPress={handleInvoiceBtnClick}
            >
              {/*<Text style={styles.bottomButtonText}>Invoice</Text>*/}
              <MaterialCommunityIcons
                name="file-document-outline"
                size={24}
                color={colors.secondary}
              />
            </TouchableOpacity>
          </View>
        )
      ) : 
        <Footer/>
      }

      
    </View>
  );

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
  searchWrapper: {
    width: '100%',
    paddingBottom: 10,
    paddingTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchText: {
    flex: 9,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 10,
  },
  searchIcon: {
    position: 'absolute',
    right: 30,
    top: 27,
  },
  proListWrapper: {
    flex: 1,
    paddingHorizontal: 20,
  },
  proListTitleWrapper:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  proListTitle: {
    color: colors.textDark,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
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
  },
});

export default ProductListScreen;
