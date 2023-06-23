import AsyncStorage from '@react-native-async-storage/async-storage';

const addProduct = async (formData) => {
  try {
    const data = await AsyncStorage.getItem('log_data');

    if (!data) {
      console.log('log_data does not exist in AsyncStorage (user.js)');
      return { payload: "Error", ref: "", stt: "error" };
    }

    const logData = JSON.parse(data);
    const userToken = logData.log_userToken;
    const userPhone = logData.log_userNumber;
    const userType = logData.log_userType;

    const url = 'https://v2.genzo.lk/App_api/saveProducts';

    const headers = new Headers({
      'Content-Type': 'multipart/form-data',
      userToken: userToken,
      userPhone: userPhone,
      userType: userType,
    });

    const options = {
      method: 'POST',
      headers: headers,
      body: formData,
    };

    console.log('save product run')
    const response = await fetch(url, options);
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(error);
    return { payload: "Error", ref: "", stt: "error" };
  }
};



const getProducts = async (type) => {
  try {
    const data = await AsyncStorage.getItem('log_data');

    if (!data) {
      console.log('log_data does not exist in AsyncStorage (user.js)');
      return { payload: "Error", ref: "", stt: "error" };
    }

    const logData = JSON.parse(data);
    const { log_userToken, log_userNumber, log_userType } = logData;

    const url = type === 'myProducts' ? 'https://v2.genzo.lk/App_api/getMyProducts' : 'https://v2.genzo.lk/App_api/getAllProducts';

    const headers = {
      'userToken': log_userToken,
      'userPhone': log_userNumber,
      'userType': log_userType
    };

    const options = {
      method: 'GET',
      headers: headers,
    };

    const response = await fetch(url, options);
    const json = await response.json();
    // console.log(json);
    return json;
  } catch (error) {
    console.error(error);
    return { payload: "Error", ref: "", stt: "error" };
  }
};



const getProductByProId  = async (id) => {
  const product = {
      id : 1,
      name: 'Organic Superfood Blend with Spirulina, Chlorella, and Wheatgrass',
      desc : 'Description is the pattern of narrative development that aims to make vivid a place, object, character, or group. Description is one of four rhetorical modes, along with exposition, argumentation, and narration. In practice it would be difficult to write literature that drew on just one of the four basic modes.',
      price: 10.99,
      image: require('../images/products/1.jpg'),
      images : [
        require('../images/products/1.jpg'),
        require('../images/products/2.jpg'),
        require('../images/products/3.jpg'),
      ],
      qty: 10,
      user : 1,
      commission : 100.00,
      status: 'active',
    };

  return product;
}


export {addProduct, getProducts, getProductByProId}