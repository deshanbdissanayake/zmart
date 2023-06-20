import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons, Entypo, Ionicons } from 'react-native-vector-icons'; 
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
    const [buttonLoading, setButtonLoading] = useState(false);

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

        <View style={styles.formWrapper}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
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
          </ScrollView>
        </View>

        <View style={styles.bottomButtonsWrapper}>
          {buttonLoading ? (
            <View style={styles.bottomButtonStyles}>
              <ActivityIndicator color={colors.white} />
            </View>
          ) : (
            <>
              <TouchableOpacity style={styles.bottomButtonStyles}>
                <MaterialCommunityIcons name="cancel" size={24} color={colors.red} />
              </TouchableOpacity>
                
              <TouchableOpacity style={styles.bottomButtonStyles} onPress={handleButtonClick}>
                <Entypo name="circle-with-plus" size={24} color={colors.secondary} />
              </TouchableOpacity>
            </>
          )}
        </View>    

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
      scrollContainer:{
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
      
      //=========================================================

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
        height: 200,
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
