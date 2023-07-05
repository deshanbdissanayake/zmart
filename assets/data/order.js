import AsyncStorage from '@react-native-async-storage/async-storage';

const getLogData = async () => {
  const data = await AsyncStorage.getItem('log_data');
  if (!data) {
    throw new Error('log_data does not exist in AsyncStorage (user.js)');
  }
  return JSON.parse(data);
};

const getMyOrders = async () => {
    const orders = [
      {
        ord_id: '001',
        buyer_id: 'B1',
        buyer_name: 'B11',
        buyer_shop: 'Introps',
        buyer_phone: '714124766',
        buyer_whtsp: '714124766',
        c_date: '2023-06-28 13:30:00',
        status: 'Pending',
        order_items: [
          {
            ord_id: '001',
            ordi_id: '1',
            pro_id: 'P1',
            pro_name: 'Premium Ultra-Durable Stainless Steel 12-Cup Programmable Coffee Maker with Built-In Grinder and Brew Strength Selector',
            pro_img: 'https://www.v2.genzo.lk/app_img/10_1.jpg',
            status: 'Pending',
            ord_qty: 2,
            ord_price: 5.00,
            ord_pcode: 'P001',
          },
          {
            ord_id: '001',
            ordi_id: '2',
            pro_id: 'P1',
            pro_name: 'Professional Series 15.6-Inch Quad-Core Laptop with Retina Display, Touch Bar, and Enhanced Graphics',
            pro_img: 'https://www.v2.genzo.lk/app_img/11_1.jpg',
            status: 'Pending',
            ord_qty: 3,
            ord_price: 10.99,
            ord_pcode: 'P001',
          },
          {
            ord_id: '001',
            ordi_id: '3',
            pro_id: 'P1',
            pro_name: 'Advanced All-in-One Multi-Function Wireless Printer with Duplex Printing, Fax, Scan, and Copy Functions',
            pro_img: 'https://www.v2.genzo.lk/app_img/11_1.jpg',
            status: 'Pending',
            ord_qty: 5,
            ord_price: 10.99,
            ord_pcode: 'P001',
          },
        ],
        grand_tot: 10.99,
      },
      {
        ord_id: '002',
        buyer_id: 'B2',
        buyer_name: 'B22',
        buyer_shop: 'Introps',
        buyer_phone: '714124766',
        buyer_whtsp: '714124766',
        c_date: '2023-06-27 13:30:00',
        status: 'Completed',
        order_items: [
          {
            ord_id: '002',
            ordi_id: 'OI3',
            pro_id: 'P3',
            pro_name: 'P1sdfasdf',
            pro_img: 'https://www.v2.genzo.lk/app_img/10_1.jpg',
            status: 'Processing',
            ord_qty: 1,
            ord_price: 5.99,
            ord_pcode: 'P003',
          },
        ],
        grand_tot: 5.99,
      },
      {
        ord_id: '003',
        buyer_id: 'B3',
        buyer_name: 'B33',
        buyer_shop: 'Introps',
        buyer_phone: '714124766',
        buyer_whtsp: '714124766',
        c_date: '2023-06-26 13:30:00',
        status: 'Processing',
        order_items: [
          {
            ord_id: '003',
            ordi_id: 'OI4',
            pro_id: 'P4',
            pro_name: 'P1sdfasdf',
            pro_img: 'https://www.v2.genzo.lk/app_img/10_1.jpg',
            status: 'Pending',
            ord_qty: 4,
            ord_price: 8.99,
            ord_pcode: 'P004',
          },
        ],
        grand_tot: 35.99,
      },
    ];
  
    return orders;
};

const getMyOr = async () => {
  try {
    const logData = await getLogData();
    const { log_userToken, log_userNumber, log_userType } = logData;
    const url = 'https://v2.genzo.lk/App_api/getSupplierOrders';

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
    throw new Error('Error occurred while adding a product');
  }
}
  
  export { getMyOrders };
  