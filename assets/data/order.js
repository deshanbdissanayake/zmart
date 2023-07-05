import AsyncStorage from '@react-native-async-storage/async-storage';

const getLogData = async () => {
  const data = await AsyncStorage.getItem('log_data');
  if (!data) {
    throw new Error('log_data does not exist in AsyncStorage (user.js)');
  }
  return JSON.parse(data);
};

const getMyOrders = async (activePanel) => {
  try {
    const logData = await getLogData();
    const { log_userToken, log_userNumber, log_userType } = logData;

    const url = 'https://v2.genzo.lk/App_api/getSupplierOrders';

    const headers = {
      userToken: log_userToken,
      userPhone: log_userNumber,
      userType: log_userType,
      activePanel: activePanel,
    };

    const options = {
      method: 'GET',
      headers: headers,
    };

    const response = await fetch(url, options);
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(error);
    throw new Error('Error occurred while getting products');
  }
};

const confirmOrder = async (formData) => {
  try {
    const logData = await getLogData();
    const { log_userToken, log_userNumber, log_userType } = logData;
    const url = 'https://v2.genzo.lk/App_api/confirmOrder';

    const headers = {
      'Content-Type': 'multipart/form-data',
      userToken: log_userToken,
      userPhone: log_userNumber,
      userType: log_userType,
    };

    const options = {
      method: 'POST',
      headers: headers,
      body: formData,
    };

    const response = await fetch(url, options);
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(error);
    throw new Error('Error occurred while confirming order');
  }
}
  
  export { getMyOrders, confirmOrder };
  