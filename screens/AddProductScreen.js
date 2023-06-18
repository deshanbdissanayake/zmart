import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView, // Import KeyboardAvoidingView
  Platform,
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import colors from '../assets/colors/colors';

import { addProduct } from '../assets/data/product';

const AddProductScreen = () => {

    //=========================================================================

    //main
    const [proName, setProName] = useState('');
    const [proDesc, setProDesc] = useState('');
    const [proPrice, setProPrice] = useState('');
    const [proQty, setProQty] = useState('');

    //errors
    const [proNameError, setProNameError] = useState(false);

    //other
    const [formType, setFormType] = useState('add'); // add or update
    const [buttonLoading, setButtonLoading] = useState(false);

    //=========================================================================

    const registrationTitle = formType === 'add' ? 'Create Product' : 'Edit Product';
    const buttonText = formType === 'add' ? 'Create' : 'Edit';
    const registrationDesc = 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used.';

    //=========================================================================
    
    const handleButtonClick = () => {
        // Handle product add/update logic here
        console.log(' button pressed');
    }

    //=========================================================================

    const ImageButton = () => {
        return (
        <TouchableOpacity>
            <View style={[styles.singleImage, styles.shadowStyle]}>
                <Ionicons
                name="add"
                size={48}
                color={colors.textDark} 
                />
            </View>
        </TouchableOpacity>
        );
    };

    //=========================================================================

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.registrationWrapper}>
          <Text style={styles.registrationTitle}>{registrationTitle}</Text>
          <Text style={styles.registrationDescription}>
            {registrationDesc}
          </Text>
        </View>
      </View>

      <View style={styles.formWrapper}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled">

            <View style={styles.formGroup}>
              <View style={styles.formContainer}>
                <TextInput
                  style={[styles.input, {width: '100%'}]}
                  placeholder="Enter Product Name"
                  value={proName}
                  onChangeText={setProName}
                  keyboardType="default"
                  editable={true}
                />
              </View>

              {proNameError ? (
                <View style={styles.errorWrapper}>
                  <Text style={styles.errorMessage}>
                    This field is required!
                  </Text>
                </View>
              ) : (
                ''
              )}
            </View>      

            <View style={styles.formGroup}>
              <View style={styles.formContainer}>
                <ImageButton />
                <ImageButton />
                <ImageButton />
              </View>
            </View>  

            <View style={styles.formGroup}>
              <View style={styles.formContainer}>
                <TextInput
                    style={styles.textarea}
                    placeholder="Enter Product Description (250 characters max)"
                    value={proDesc}
                    onChangeText={setProDesc}
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
                  onChangeText={setProPrice}
                  keyboardType="numeric"
                  editable={true}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter Product Qty"
                  value={proQty}
                  onChangeText={setProQty}
                  keyboardType="numeric"
                  editable={true}
                />
              </View>
            </View>      

            <View style={styles.formGroup}>
              {buttonLoading ? (
                <View style={[styles.buttonStyle, styles.buttonLoading]}>
                  <ActivityIndicator color={colors.white} />
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={handleButtonClick}>
                  <Text style={styles.buttonText}>
                  {buttonText}
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            </ScrollView>
        </View>        
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.secondary,
      },
      headerWrapper: {
        flex: 2,
        paddingHorizontal: 20,
        paddingTop: 40,
      },
      registrationWrapper: {
        marginTop: 30,
      },
      registrationTitle: {
        color: colors.textDark,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      registrationDescription: {
        marginBottom: 20,
      },
      formWrapper: {
        flex: 4,
        backgroundColor: colors.bgLight,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 20,
      },
      scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
      },
      formGroup: {
        flexDirection: 'column',
        marginBottom: 10,
      },
      formContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
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
      buttonStyle: {
        width: '100%',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.textDark,
      },
      buttonLoading: {
        backgroundColor: colors.gray,
      },
      buttonText: {
        color: colors.white,
      },
    
      //=========================================================

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

      textarea : {
        width: '100%',
        height: 100,
        borderColor: colors.border,
        color: colors.textDark,
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 10,
      },

      //=========================================================

      errorWrapper: {
        width: '100%',
      },
      errorMessage: {
        color: colors.error,
        fontSize: 11,
        textAlign: 'right',
      },

      //=========================================================
});

export default AddProductScreen;
