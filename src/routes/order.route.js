const express = require('express');
const router = express.Router();

const { 
    createOrder, 
    getOrderById, 
    getOrdersByUserId, 
    updateOrderStatus, 
    deleteOrder 
} = require('../controller/order.controller');

// Order Routes
router.post('/createOrder/', createOrder);
router.get('/getOrderById/:id', getOrderById);
router.get('/getOrdersByUserId/:user_id', getOrdersByUserId);
router.put('/updateOrderStatus/:id', updateOrderStatus);
router.delete('/deleteOrder/:id', deleteOrder);

module.exports = router;
