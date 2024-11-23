const Order = require('../models/order.model');

// Create a new order
const createOrder = (req, res) => {
    const { user_id, status, total_price } = req.body;

    Order.create(user_id, status, total_price, (err, results) => {
        if (err) return res.status(500).json({ error: 'Error creating order', details: err });
        res.status(201).json({ message: 'Order created', orderId: results.insertId });
    });
};

// Get an order by ID
const getOrderById = (req, res) => {
    const { id } = req.params;

    Order.findById(id, (err, results) => {
        if (err) return res.status(500).json({ error: 'Error fetching order', details: err });
        if (results.length === 0) return res.status(404).json({ error: 'Order not found' });
        res.status(200).json(results[0]);
    });
};

// Get all orders for a specific user
const getOrdersByUserId = (req, res) => {
    const { user_id } = req.params;

    Order.findByUserId(user_id, (err, results) => {
        if (err) return res.status(500).json({ error: 'Error fetching orders', details: err });
        res.status(200).json(results);
    });
};

// Update an order's status
const updateOrderStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    Order.updateStatus(id, status, (err) => {
        if (err) return res.status(500).json({ error: 'Error updating status', details: err });
        res.status(200).json({ message: 'Order status updated' });
    });
};

// Delete an order
const deleteOrder = (req, res) => {
    const { id } = req.params;

    Order.deleteById(id, (err) => {
        if (err) return res.status(500).json({ error: 'Error deleting order', details: err });
        res.status(200).json({ message: 'Order deleted' });
    });
};

module.exports = {
    createOrder,
    getOrderById,
    getOrdersByUserId,
    updateOrderStatus,
    deleteOrder,
};
