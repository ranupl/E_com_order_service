const {
  placeOrder,
  initiateOrder,
  fetchOrdersForUser,
  fetchOrderById,
  changeOrderStatus,
} = require('../service/order.service');

const completeOrder = async (req, res) => {
  const orderData = req.body;
  try {
    const order = await placeOrder(orderData);
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const order = await initiateOrder(req.body);
    res.status(201).json({ message: 'Order is in progress, proceed to payment', order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Orders for a User
const getOrders = async (req, res) => {
  try {
    const orders = await fetchOrdersForUser(req.params.userId);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Order by ID
const getOrder = async (req, res) => {
  try {
    const order = await fetchOrderById(req.params.id);
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Update Order Status
const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await changeOrderStatus(req.params.id, req.body.status);
    res.status(200).json({ message: 'Order status updated', updatedOrder });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createOrder, getOrders, getOrder, updateOrder, completeOrder };
