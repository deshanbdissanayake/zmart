import AsyncStorage from '@react-native-async-storage/async-storage';

const getLogData = async () => {
  const data = await AsyncStorage.getItem('log_data');
  if (!data) {
    throw new Error('log_data does not exist in AsyncStorage (user.js)');
  }
  return JSON.parse(data);
};

const addProduct = async (formData) => {
  try {
    const logData = await getLogData();
    const { log_userToken, log_userNumber, log_userType } = logData;
    const url = 'https://v2.genzo.lk/App_api/saveProducts';

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
    throw new Error('Error occurred while adding a product');
  }
};

const getProducts = async (type) => {
  try {
    const logData = await getLogData();
    const { log_userToken, log_userNumber, log_userType } = logData;
    const url =
      type === 'myProducts'
        ? 'https://v2.genzo.lk/App_api/getMyProducts'
        : 'https://v2.genzo.lk/App_api/getAllProducts';

    const headers = {
      userToken: log_userToken,
      userPhone: log_userNumber,
      userType: log_userType,
    };

    const options = {
      method: 'GET',
      headers: headers,
    };

    const response = await fetch(url, options);
    //console.log(response)
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(error);
    throw new Error('Error occurred while getting products');
  }
};

const performProductAction = async (url, proId) => {
  try {
    const logData = await getLogData();
    const { log_userToken, log_userNumber, log_userType } = logData;

    const headers = {
      'Content-Type': 'multipart/form-data',
      userToken: log_userToken,
      userPhone: log_userNumber,
      userType: log_userType,
    };

    const formData = new FormData();
    formData.append('proId', proId);

    const options = {
      method: 'POST',
      headers: headers,
      body: formData,
    };

    const response = await fetch(url, options);
    const responseData = await response.json();
    console.log(responseData)
    return responseData;
  } catch (error) {
    console.error(error);
    throw new Error('Error occurred while performing the product action');
  }
};

const pauseProduct = async (proId) => {
  const url = 'https://v2.genzo.lk/App_api/pauseProducts';
  return performProductAction(url, proId);
};

const activateProduct = async (proId) => {
  const url = 'https://v2.genzo.lk/App_api/activateProducts';
  return performProductAction(url, proId);
};

const deleteProduct = async (proId) => {
  const url = 'https://v2.genzo.lk/App_api/deleteProducts';
  return performProductAction(url, proId);
};

export {
  addProduct,
  getProducts,
  pauseProduct,
  activateProduct,
  deleteProduct
};
