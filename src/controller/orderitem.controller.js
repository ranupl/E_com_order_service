const OrderItem = require('../models/orderitem.model');

// Create a new order item
const createOrderItem = (req, res) => {
    const { order_id, product_id, quantity, price } = req.body;

    OrderItem.create(order_id, product_id, quantity, price, (err, results) => {
        if (err) return res.status(500).json({ error: 'Error creating order item', details: err });
        res.status(201).json({ message: 'Order item created', orderItemId: results.insertId });
    });
};

// Get all items for a specific order
const getOrderItemsByOrderId = (req, res) => {
    const { order_id } = req.params;

    OrderItem.findByOrderId(order_id, (err, results) => {
        if (err) return res.status(500).json({ error: 'Error fetching order items', details: err });
        res.status(200).json(results);
    });
};

// Update an order item
const updateOrderItem = (req, res) => {
    const { id } = req.params;
    const { quantity, price } = req.body;

    OrderItem.update(id, quantity, price, (err) => {
        if (err) return res.status(500).json({ error: 'Error updating order item', details: err });
        res.status(200).json({ message: 'Order item updated' });
    });
};

// Delete an order item
const deleteOrderItem = (req, res) => {
    const { id } = req.params;

    OrderItem.deleteById(id, (err) => {
        if (err) return res.status(500).json({ error: 'Error deleting order item', details: err });
        res.status(200).json({ message: 'Order item deleted' });
    });
};

module.exports = {
    createOrderItem,
    getOrderItemsByOrderId,
    updateOrderItem,
    deleteOrderItem,
};
