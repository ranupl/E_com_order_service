const express = require('express');
const router = express.Router();

const { 
    createOrderItem, 
    getOrderItemsByOrderId, 
    updateOrderItem, 
    deleteOrderItem 
} = require('../controller/orderitem.controller');

// Order Item Routes
router.post('/createOrderItem', createOrderItem);
router.get('/getOrderItemsByOrderId/:order_id', getOrderItemsByOrderId);
router.put('/updateOrderItem/:id', updateOrderItem);
router.delete('/deleteOrderItem/:id', deleteOrderItem);

module.exports = router;
