const Order = require('../model/order.model');

// Create a new order
const createOrder = async (orderData) => {
  return await Order.create(orderData);
};

// Get all orders for a user
const getOrdersByUserId = async (userId) => {
  return await Order.findAll({ where: { userId } });
};

// Get order by ID
const getOrderById = async (id) => {
  return await Order.findByPk(id);
};

// Update order status
const updateOrderStatus = async (id, status) => {
  return await Order.update({ status }, { where: { id } });
};

module.exports = { createOrder, getOrdersByUserId, getOrderById, updateOrderStatus };
