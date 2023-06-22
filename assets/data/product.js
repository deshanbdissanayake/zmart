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

    const response = await fetch(url, options);
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw new Error('Failed to add/update product.');
  }
};



const getProducts = async () => {
    const products = [
        {
          id : 1,
          name: 'Organic Superfood Blend with Spirulina, Chlorella, and Wheatgrass',
          desc : 'desc 1',
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
        },
        {
          id : 2, 
          name: 'Ultra-Hydrating Anti-Aging Facial Moisturizer with Vitamin C and Hyaluronic Acid',
          desc : 'desc 2',
          price: 19.99,
          image: require('../images/products/2.jpg'),
          images : [
            require('../images/products/1.jpg'),
            require('../images/products/2.jpg'),
            require('../images/products/3.jpg'),
          ],
          qty: 1,
          user : 1,
          commission : 100.00,
          status: 'active',
        },
        {
          id : 3,
          name: 'Premium Noise-Canceling Bluetooth Headphones with Built-in Microphone and 40-Hour Battery Life',
          desc : 'desc 3',
          price: 7.99,
          image: require('../images/products/3.jpg'),
          images : [
            require('../images/products/1.jpg'),
            require('../images/products/2.jpg'),
            require('../images/products/3.jpg'),
          ],
          qty: 0,
          user : 1,
          commission : 100.00,
          status: 'active',
        },
        {
          id : 4,
          name: 'Extra Strength Joint Support Supplement with Glucosamine, Chondroitin, and MSM for Joint Health and Mobility',
          desc : 'desc 4',
          price: 17.99,
          image: require('../images/products/4.jpg'),
          images : [
            require('../images/products/1.jpg'),
            require('../images/products/2.jpg'),
            require('../images/products/3.jpg'),
          ],
          qty: 50,
          user : 1,
          commission : 100.00,
          status: 'active',
        },
      ];
    return products;
}

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