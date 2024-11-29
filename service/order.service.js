const { createOrder, getOrdersByUserId, getOrderById, updateOrderStatus } = require('../store/order.store');
const axios = require('axios');

// Create a new order
const initiateOrder = async (orderData) => {
  const { products, userId, totalAmount } = orderData;

  // Check product availability
  const productCheck = await axios.post('http://localhost:5002/api/product/products/check', { products });
  if (!productCheck.data.success) throw new Error('Product not available');

  const failedUpdates = [];
  await Promise.all(
    products.map(async (product) => {
      try {
        const response = await axios.post('http://localhost:5002/api/product/products/updateStock', {
          productId: product.productId,
          quantity: product.quantity,
        });
 
        if (!response.data.success) {
          failedUpdates.push(product.productId);
        }
        
      } catch (error) {
        console.error("Axios error details:", error.response?.status, error.response?.data || error.message);
        failedUpdates.push(product.productId);
      }
    })
  );

  if (failedUpdates.length) {
    throw new Error(`Stock update failed for products: ${failedUpdates.join(", ")}`);
  }

  // Initiate Payment
  let paymentId;
  try {
    const initiatePaymentResponse = await axios.post('http://localhost:5003/api/payment/initiate', {
      userId,
      amount: totalAmount, 
    });
    
    if (!initiatePaymentResponse.data) {
      throw new Error('Payment initiation failed');
    }

    paymentId = initiatePaymentResponse.data.payment._id;


  } catch (error) {
    console.error("Error during payment initiation:", error.response?.data || error.message);
    throw new Error('Failed to initiate payment');
  }

  return { 
    message: "Payment initiated, proceed to complete the payment", 
    paymentURL: `http://localhost:5003/api/payment/complete/${paymentId}`, orderData 
  };
};

// Create an order
const placeOrder = async (orderData) => {
  await createOrder(orderData);
  return { message: "Order created successfully" };
};

// Get all orders for a user
const fetchOrdersForUser = async (userId) => {
  return await getOrdersByUserId(userId);
};

// Get order by ID
const fetchOrderById = async (id) => {
  return await getOrderById(id);
};

// Update order status
const changeOrderStatus = async (id, status) => {
  return await updateOrderStatus(id, status);
};

module.exports = { placeOrder, fetchOrdersForUser, fetchOrderById, changeOrderStatus, initiateOrder };
