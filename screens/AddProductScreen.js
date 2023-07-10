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

const AddProductScreen = ({ route, navigation }) => {
  const { productData, updateProductData } = route.params || {};
  //console.log(productData);

  const [newProductData, setNewProductData] = useState({
    proId: productData?.id || '',
    proName: productData?.name || '',
    proDesc: productData?.desc || '',
    proPrice: productData?.price || '',
    proQty: productData?.qty || '',
    image1: productData?.image1 || '',
    image2: productData?.image2 || '',
    image3: productData?.image3 || '',
  });

  const { proId, proName, proDesc, proPrice, proQty, image1, image2, image3 } = newProductData;

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
    const showImagePickerOptions = () => {
      Alert.alert(
        'Select Image Source',
        'Choose the source of the image',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Camera', onPress: () => launchCamera() },
          { text: 'Library', onPress: () => launchImageLibrary() },
        ],
        { cancelable: true }
      );
    };

    const launchCamera = async () => {
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      if (cameraStatus !== 'granted') {
        alert('Permission to access the camera is required!');
        return;
      }
      launchImagePicker(true);
    };

    const launchImageLibrary = async () => {
      const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (libraryStatus !== 'granted') {
        alert('Permission to access the media library is required!');
        return;
      }
      launchImagePicker(false);
    };

    const launchImagePicker = async (isCamera) => {

      const result = isCamera
        ? await ImagePicker.launchCameraAsync({
          mediaTypes:ImagePicker.MediaTypeOptions.Images,
          allowsEditing:true,
          aspect:[1,1],
          quality:0.5
        })
        : await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });

      if (!result.canceled) {
        const key = `image${imageNumber}`;
        handleInputChange(key, result.assets[0].uri);
      }
    };

    showImagePickerOptions();
  };

  const handleInputChange = (key, value) => {
    setNewProductData((prevFormData) => ({
      ...prevFormData,
      [key]: value,
    }));
  };


  const handleButtonClick = async () => {
    const errors = {};

    if (proName.trim() === '') {
      errors.proNameError = true;
    }

    if (proPrice.trim() === '' || parseFloat(proPrice) < 0) {
      errors.proPriceError = true;
    }

    if (proQty.trim() === '' || parseInt(proQty) < 0 || proQty.includes('.')) {
      errors.proQtyError = true;
    }

    if (image1 === '') {
      errors.image1Error = true;
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true);
      console.log('Product save Button pressed');

      try {
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

        //console.log('send form data - ', formData)

        const response = await addProduct(formData); // Call addProduct with the newProductData
        console.log(response)

        let msg = proId != '' ? 'Updated' : 'Added'

        if (response.stt === 'ok') {

          Alert.alert('Success', 'Product '+msg+' successfully!', [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ]);

          handleReset();

        } else {

          Alert.alert('Error', 'Failed to '+msg+' product.', [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ]);

        }
      } catch (error) {
        Alert.alert('Error', 'Failed to add/update product try.');
      } finally {
        setLoading(false);
      }
    }
  };


  const handleReset = () => {
    if(proId !== ''){
      updateProductData({
        id: proId,
        name: proName,
        desc: proDesc,
        price: proPrice,
        qty: proQty,
        admin_status: 'stop',
      });
      navigation.goBack();
    }else{
      setNewProductData({
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
  }

  const ImageButton = ({ imageNumber }) => {
    const imageSource = newProductData[`image${imageNumber}`];

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

                  {(formErrors.image1Error) && (
                    <View style={styles.errorWrapper}>
                      <Text style={styles.errorMessage}>Please upload first image!</Text>
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
                      <Text style={styles.errorMessage}>Check Product Price & Qty fields!</Text>
                    </View>
                  )}
                </View>
              </ScrollView>
            </View>

            <View style={styles.bottomButtonsWrapper}>
              <TouchableOpacity style={styles.bottomButtonStyles} onPress={handleReset}>
                <Text style={styles.bottomButtonText}>Cancel</Text>
                <MaterialCommunityIcons name="cancel" size={24} color={colors.red} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.bottomButtonStyles} onPress={handleButtonClick}>
                <Text style={styles.bottomButtonText}>{ proId !== '' ? 'Edit' : 'Save' }</Text>
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
  bottomButtonText: {
    marginRight: 10,
    fontWeight: 'bold',
    color: colors.white,
    fontSize: 12,
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
