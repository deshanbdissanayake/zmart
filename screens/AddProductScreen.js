import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Image,
  Alert
} from 'react-native';
import { MaterialCommunityIcons, Entypo, Ionicons } from 'react-native-vector-icons';
import colors from '../assets/colors/colors';
import * as ImagePicker from 'expo-image-picker';

import { addProduct } from '../assets/data/product';

const AddProductScreen = () => {
  const [productData, setProductData] = useState({
    proId: '',
    proName: '',
    proDesc: '',
    proPrice: '',
    proQty: '',
    image1: '',
    image2: '',
    image3: '',
  });

  const { proId, proName, proDesc, proPrice, proQty, image1, image2, image3 } = productData;

  const [formErrors, setFormErrors] = useState({
    proNameError: false,
    proDescError: false,
    proPriceError: false,
    proQtyError: false,
    image1Error: false,
    image2Error: false,
    image3Error: false,
  });

  const [loading, setLoading] = useState(false);

  const handleImageSelect = async (imageNumber) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert('Permission to access media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const key = `image${imageNumber}`;
      handleInputChange(key, result.assets[0].uri);
    }
  };

  const handleInputChange = (key, value) => {
    setProductData((prevFormData) => ({
      ...prevFormData,
      [key]: value,
    }));
  };

  const handleButtonClick = () => {
    const errors = {};

    if (proName.trim() === '') {
      errors.proNameError = true;
    }

    if (proDesc.trim() === '') {
      errors.proDescError = true;
    }

    if (proPrice.trim() === '') {
      errors.proPriceError = true;
    }

    if (proQty.trim() === '') {
      errors.proQtyError = true;
    }

    if (image1 === '') {
      errors.image1Error = true;
    }

    if (image2 === '') {
      errors.image2Error = true;
    }

    if (image3 === '') {
      errors.image3Error = true; 
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true);
      console.log('Button pressed');
      
      
      // Create a new form data object
      const formData = new FormData();

      // Append the image data to the form data object
      formData.append('image1', {
        uri: image1,
        name: 'image.jpg',
        type: 'image/jpeg',
      });
      formData.append('image2', {
        uri: image2,
        name: 'image.jpg',
        type: 'image/jpeg',
      });
      formData.append('image3', {
        uri: image3,
        name: 'image.jpg',
        type: 'image/jpeg',
      });
      formData.append('proId', proId);
      formData.append('proName', proName);
      formData.append('proDes', proDesc);
      formData.append('proPrice', proPrice);
      formData.append('proQty', proQty);

      addProduct(formData) // Call addProduct with the productData
      .then((response) => {
        console.log(response)
        {/*Alert.alert('Success', 'Product added/updated successfully!', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]); */}
      })
      .catch((error) => {
        Alert.alert('Error', 'Failed to add/update product.');
      })
      .finally(() => {
        setLoading(false);
      });
    }
  };

  const handleReset = () => {
    setProductData({
      proId: '',
      proName: '',
      proDesc: '',
      proPrice: '',
      proQty: '',
      image1: '',
      image2: '',
      image3: '',
    })
    setFormErrors({
      proNameError: false,
      proDescError: false,
      proPriceError: false,
      proQtyError: false,
      image1Error: false,
      image2Error: false,
      image3Error: false,
    })
    setLoading(false)
  }

  const ImageButton = ({ imageNumber }) => {
    const imageSource = productData[`image${imageNumber}`];
  
    return (
      <TouchableOpacity onPress={() => handleImageSelect(imageNumber)}>
        <View style={[styles.singleImage, styles.shadowStyle]}>
          {imageSource ? (
            <Image source={{ uri: imageSource }} style={styles.selectedImage} />
          ) : (
            <Ionicons name="add" size={48} color={colors.textDark} />
          )}
        </View>
      </TouchableOpacity>
    );
  };
  

  return (
    <View style={styles.container}>
      {loading ? (
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator color={colors.textDark} />
          </View>
        ) : (
          <>
            <View style={styles.formWrapper}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
              >
                <View style={styles.formGroup}>
                  <View style={styles.formContainer}>
                    <TextInput
                      style={[styles.input, { width: '100%' }]}
                      placeholder="Enter Product Name"
                      value={proName}
                      onChangeText={(text) => handleInputChange('proName', text)}
                      keyboardType="default"
                      editable={true}
                    />
                  </View>

                  {formErrors.proNameError && (
                    <View style={styles.errorWrapper}>
                      <Text style={styles.errorMessage}>Product Name is required!</Text>
                    </View>
                  )}
                </View>

                <View style={styles.formGroup}>
                  <View style={styles.formContainer}>
                    <ImageButton imageNumber={1} />
                    <ImageButton imageNumber={2} />
                    <ImageButton imageNumber={3} />
                  </View>

                  {(formErrors.image1Error || formErrors.image2Error || formErrors.image3Error) && (
                    <View style={styles.errorWrapper}>
                      <Text style={styles.errorMessage}>Please upload all three images!</Text>
                    </View>
                  )}
                </View>

                <View style={styles.formGroup}>
                  <View style={styles.formContainer}>
                    <TextInput
                      style={styles.textarea}
                      placeholder="Enter Product Description (250 characters max)"
                      value={proDesc}
                      onChangeText={(text) => handleInputChange('proDesc', text)}
                      keyboardType="default"
                      multiline={true}
                      editable={true}
                      numberOfLines={4}
                      maxLength={250}
                    />
                  </View>

                  {formErrors.proDescError && (
                    <View style={styles.errorWrapper}>
                      <Text style={styles.errorMessage}>Product Description is required!</Text>
                    </View>
                  )}
                </View>

                <View style={styles.formGroup}>
                  <View style={styles.formContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter Product Price"
                      value={proPrice}
                      onChangeText={(text) => handleInputChange('proPrice', text)}
                      keyboardType="numeric"
                      editable={true}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter Product Qty"
                      value={proQty}
                      onChangeText={(text) => handleInputChange('proQty', text)}
                      keyboardType="numeric"
                      editable={true}
                    />
                  </View>

                  {(formErrors.proPriceError || formErrors.proQtyError) && (
                    <View style={styles.errorWrapper}>
                      <Text style={styles.errorMessage}>Product Price & Qty field is required!</Text>
                    </View>
                  )}
                </View>
              </ScrollView>
            </View>

            <View style={styles.bottomButtonsWrapper}>
              <TouchableOpacity style={styles.bottomButtonStyles} onPress={handleReset}>
                <MaterialCommunityIcons name="cancel" size={24} color={colors.red} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.bottomButtonStyles} onPress={handleButtonClick}>
                <Entypo name="circle-with-plus" size={24} color={colors.secondary} />
              </TouchableOpacity>
            </View>
          </>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formWrapper: {
    flex: 1,
    backgroundColor: colors.bgLight,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  formGroup: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  formContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  disabled: {
    backgroundColor: colors.disabled,
  },
  input: {
    height: 40,
    borderColor: colors.border,
    color: colors.textDark,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
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
  singleImage: {
    width: 90,
    height: 90, 
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  selectedImage:{
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  textarea: {
    width: '100%',
    height: 200,
    borderColor: colors.border,
    color: colors.textDark,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  errorWrapper: {
    width: '100%',
  },
  errorMessage: {
    color: colors.error,
    fontSize: 11,
    textAlign: 'right',
  },
  activityIndicatorWrapper:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddProductScreen;
