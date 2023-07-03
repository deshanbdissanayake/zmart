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
  
  export { getMyOrders };
  