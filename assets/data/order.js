const getMyOrders = async () => {
    const orders = [
      {
        ord_id: '001',
        buyer_id: 'B1',
        buyer_name: 'B11',
        c_date: '2023-06-28 13:30:00',
        status: 'Pending',
        order_items: [
          {
            ordi_id: 'OI1',
            pro_id: 'P1',
            status: 'Pending',
            ord_qty: 2,
            ord_price: 10.99,
            total: 21.98,
            ord_pcode: 'P001',
          },
          {
            ordi_id: 'OI2',
            pro_id: 'P2',
            status: 'Completed',
            ord_qty: 3,
            ord_price: 15.99,
            total: 47.97,
            ord_pcode: 'P002',
          },
        ],
      },
      {
        ord_id: '2',
        buyer_id: 'B2',
        buyer_name: 'B22',
        c_date: '2023-06-27 13:30:00',
        status: 'Completed',
        order_items: [
          {
            ordi_id: 'OI3',
            pro_id: 'P3',
            status: 'Processing',
            ord_qty: 1,
            ord_price: 5.99,
            total: 5.99,
            ord_pcode: 'P003',
          },
        ],
      },
      {
        ord_id: '3',
        buyer_id: 'B3',
        buyer_name: 'B33',
        c_date: '2023-06-26 13:30:00',
        status: 'Processing',
        order_items: [
          {
            ordi_id: 'OI4',
            pro_id: 'P4',
            status: 'Pending',
            ord_qty: 4,
            ord_price: 8.99,
            total: 35.96,
            ord_pcode: 'P004',
          },
          {
            ordi_id: 'OI5',
            pro_id: 'P5',
            status: 'Completed',
            ord_qty: 2,
            ord_price: 12.99,
            total: 25.98,
            ord_pcode: 'P005',
          },
        ],
      },
    ];
  
    return orders;
  };
  
  export { getMyOrders };
  