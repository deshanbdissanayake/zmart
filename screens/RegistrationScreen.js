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

import { sendOtp, verifyNumber, saveUser } from '../assets/data/user';

const RegistrationScreen = () => {
  {
    /* ========================================================================================= */
  }
  {
    /* form states */
  }
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');

  const [whatsapp, setWhatsapp] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [nic, setNic] = useState('');
  const [shopName, setShopName] = useState('');
  {
    /* errors */
  }
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [otpError, setOtpError] = useState(false);

  const [whatsappError, setWhatsappError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [nicError, setNicError] = useState(false);
  const [shopNameError, setShopNameError] = useState(false);

  {
    /* other states */
  }
  const [buttonLoading, setButtonLoading] = useState(false); //button get disabled while loading
  const [otpSent, setOtpSent] = useState(false);
  const [showResend, setShowResend] = useState(false);

  const [phoneNumberVerified, setPhoneNumberVerified] = useState(false);

  {
    /* ========================================================================================= */
  }
  {
    /* handle button click */
  }
  const handleButtonClick = () => {
    // Handle registration logic here
    console.log(' button pressed');

    if (!phoneNumberVerified) {
      // otp sending and phone number verification
      if (!otpSent) {
        // Phone Number Validation check
        if (phoneNumber.length !== 9 || phoneNumber.charAt(0) !== '7') {
          setPhoneNumberError(true);
        } else {
          setPhoneNumberError(false);
          setButtonLoading(true);

          sendOtpFunc(); //send otp
        }
      } else {
        // OTP Validation
        if (otp.length !== 4) {
          setOtpError(true);
        } else {
          setOtpError(false);
          setButtonLoading(true);

          verifyNumberFunc(); //confirm otp and verify number
        }
      }
    } else {
      // details validation
      let isValid = true;

      //validations here
      // Validation for WhatsApp
      if (!whatsapp) {
        setWhatsappError(true);
        isValid = false;
      } else {
        setWhatsappError(false);
      }

      // Validation for Name
      if (!name) {
        setNameError(true);
        isValid = false;
      } else {
        setNameError(false);
      }

      // Validation for Address
      if (!address) {
        setAddressError(true);
        isValid = false;
      } else {
        setAddressError(false);
      }

      // Validation for NIC
      if (!nic) {
        setNicError(true);
        isValid = false;
      } else {
        // Validate NIC based on its type
        if (nic.length === 10 && !/^(\d{9}[X|V])$/i.test(nic)) {
          setNicError(true);
          isValid = false;
        } else if (nic.length === 12 && !/^(\d{12})$/i.test(nic)) {
          setNicError(true);
          isValid = false;
        } else {
          setNicError(false);
        }
      }

      // Validation for Shop Name
      if (!shopName) {
        setShopNameError(true);
        isValid = false;
      } else {
        setShopNameError(false);
      }

      // If all fields are valid, proceed with save details
      if (isValid) {
        setButtonLoading(true);

        //save user data
        saveUserFunc(formData);
      }
    }
  };

  {
    /* send otp function */
  }
  const sendOtpFunc = () => {
    sendOtp(phoneNumber)
      .then((otpStatus) => {
        if (otpStatus) {
          setOtpSent(true);
          setTimeout(() => {
            setShowResend(true);
          }, 20000);
        } else {
          setPhoneNumberError(true);
        }
      })
      .catch((error) => {
        console.error('Verification error:', error);
        setPhoneNumberError(true);
      })
      .finally(() => {
        setButtonLoading(false); // Disable loading state
      });
  };

  {
    /* confirm otp and verify number */
  }
  const verifyNumberFunc = () => {
    verifyNumber(phoneNumber, otp)
      .then((verifyStatus) => {
        if (verifyStatus) {
          setPhoneNumberVerified(true);
        } else {
          setOtpError(true);
        }
      })
      .catch((error) => {
        console.error('Verification error:', error);
        setOtpError(true);
      })
      .finally(() => {
        setButtonLoading(false); // Disable loading state
      });
  };

  {
    /* save user */
  }
  const saveUserFunc = () => {
    let formData = {
      phoneNumber: phoneNumber,
      whatsapp: whatsapp,
      name: name,
      address: address,
      nic: nic,
      shopName: shopName,
    };

    saveUser(formData)
      .then((verifyStatus) => {
        if (verifyStatus) {
          console.log('user saved');
        }
      })
      .catch((error) => {
        console.error('Verification error:', error);
      })
      .finally(() => {
        setButtonLoading(false); // Disable loading state
      });
  };

  {
    /* resend button click */
  }
  const resendButtonClick = () => {
    setOtp('');
    setShowResend(false);
    sendOtpFunc();
  };

  {
    /* ========================================================================================= */
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.registrationWrapper}>
          <Text style={styles.registrationTitle}>Create an Account</Text>
          <Text style={styles.registrationDescription}>
            In publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used.
          </Text>
        </View>
      </View>

      {!phoneNumberVerified ? (
        <View style={styles.formWrapper}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled">
            {/*==========================================================================*/}
            {/* phone number & otp */}
            {/*==========================================================================*/}
            {!otpSent ? (
              <View style={styles.formGroup}>
                <View style={styles.formContainer}>
                  <TextInput
                    style={[styles.input, styles.inputNumberCode]}
                    placeholder="Enter phone number"
                    value={'+94'}
                    editable={false}
                  />
                  <TextInput
                    style={[styles.input, styles.inputNumber]}
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="numeric"
                    maxLength={9}
                  />
                </View>

                {phoneNumberError ? (
                  <View style={styles.errorWrapper}>
                    <Text style={styles.errorMessage}>
                      Check your phone number again!
                    </Text>
                  </View>
                ) : (
                  ''
                )}
              </View>
            ) : (
              <View style={styles.formGroup}>
                <View>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter OTP"
                    value={otp}
                    onChangeText={setOtp}
                    keyboardType="numeric"
                    maxLength={4}
                  />
                </View>

                {otpError ? (
                  <View style={styles.errorWrapper}>
                    <Text style={styles.errorMessage}>
                      Check your OTP again!
                    </Text>
                  </View>
                ) : (
                  ''
                )}
              </View>
            )}
            {/*==========================================================================*/}

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
                    {!otpSent ? 'Send OTP' : 'Confirm'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {showResend ? (
              <TouchableOpacity onPress={resendButtonClick}>
                <Text style={styles.resendButton}>Resend OTP</Text>
              </TouchableOpacity>
            ) : (
              ''
            )}
          </ScrollView>
        </View>
      ) : (
        <View style={styles.formWrapper}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled">
            <View style={styles.formGroup}>
              <View style={styles.formContainer}>
                <TextInput
                  style={[
                    styles.input,
                    styles.inputNumberCode,
                    styles.disabled,
                  ]}
                  value={'+94'}
                  editable={false}
                />
                <TextInput
                  style={[styles.input, styles.inputNumber, styles.disabled]}
                  value={phoneNumber}
                  maxLength={9}
                  editable={false}
                />
              </View>
            </View>
            <View style={styles.formGroup}>
              <View style={styles.formContainer}>
                <TextInput
                  style={[
                    styles.input,
                    styles.inputNumberCode,
                    styles.disabled,
                  ]}
                  value={'+94'}
                  editable={false}
                />
                <TextInput
                  style={[styles.input, styles.inputNumber]}
                  placeholder="Enter WhatsApp No"
                  value={whatsapp}
                  onChangeText={setWhatsapp}
                  maxLength={9}
                  keyboardType="numeric"
                />
              </View>
              {whatsappError ? (
                <View style={styles.errorWrapper}>
                  <Text style={styles.errorMessage}>
                    Check your WhatsApp Number again!
                  </Text>
                </View>
              ) : (
                ''
              )}
            </View>
            <View style={styles.formGroup}>
              <View style={styles.formContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Name"
                  value={name}
                  onChangeText={setName}
                  keyboardType="default"
                />
              </View>

              {nameError ? (
                <View style={styles.errorWrapper}>
                  <Text style={styles.errorMessage}>
                    Check your Name again!
                  </Text>
                </View>
              ) : (
                ''
              )}
            </View>
            <View style={styles.formGroup}>
              <View style={styles.formContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Address"
                  value={address}
                  onChangeText={setAddress}
                  keyboardType="default"
                />
              </View>

              {addressError ? (
                <View style={styles.errorWrapper}>
                  <Text style={styles.errorMessage}>
                    Check your Address again!
                  </Text>
                </View>
              ) : (
                ''
              )}
            </View>
            <View style={styles.formGroup}>
              <View style={styles.formContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter NIC"
                  value={nic}
                  onChangeText={setNic}
                  keyboardType="default"
                />
              </View>

              {nicError ? (
                <View style={styles.errorWrapper}>
                  <Text style={styles.errorMessage}>Check your NIC again!</Text>
                </View>
              ) : (
                ''
              )}
            </View>
            <View style={styles.formGroup}>
              <View style={styles.formContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Shop Name"
                  value={shopName}
                  onChangeText={setShopName}
                  keyboardType="default"
                />
              </View>

              {shopNameError ? (
                <View style={styles.errorWrapper}>
                  <Text style={styles.errorMessage}>
                    Check your Shop Name again!
                  </Text>
                </View>
              ) : (
                ''
              )}
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
                  <Text style={styles.buttonText}>Create Account</Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default RegistrationScreen;

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
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  inputNumberCode: {
    flex: 2,
    marginRight: 5,
  },
  inputNumber: {
    flex: 8,
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
    width: '100%',
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
  resendButton: {
    fontSize: 11,
    marginTop: 20,
    textDecorationLine: 'underline',
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
