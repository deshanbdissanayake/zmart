// add a new product
const addProduct = async (phoneNumber) => {
    return true;
};

const getProducts = async () => {
    const products = [
        {
          name: 'Organic Superfood Blend with Spirulina, Chlorella, and Wheatgrass',
          desc : 'desc 1',
          price: 10.99,
          image: require('../images/products/1.jpg'),
          qty: 10,
          user : 1,
          commission : 100.00,
        },
        {
          name: 'Ultra-Hydrating Anti-Aging Facial Moisturizer with Vitamin C and Hyaluronic Acid',
          desc : 'desc 2',
          price: 19.99,
          image: require('../images/products/2.jpg'),
          qty: 1,
          user : 1,
          commission : 100.00,
        },
        {
          name: 'Premium Noise-Canceling Bluetooth Headphones with Built-in Microphone and 40-Hour Battery Life',
          desc : 'desc 3',
          price: 7.99,
          image: require('../images/products/3.jpg'),
          qty: 0,
          user : 1,
          commission : 100.00,
        },
        {
          name: 'Extra Strength Joint Support Supplement with Glucosamine, Chondroitin, and MSM for Joint Health and Mobility',
          desc : 'desc 4',
          price: 17.99,
          image: require('../images/products/4.jpg'),
          qty: 50,
          user : 1,
          commission : 100.00,
        },
      ];
    return products;
}


export {addProduct, getProducts}