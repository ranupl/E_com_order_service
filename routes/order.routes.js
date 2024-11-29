const express = require('express');
const { createOrder, getOrders, getOrder, updateOrder, completeOrder } = require('../controller/order.controller');

const router = express.Router();

router.post('/createOrder', createOrder);
router.post('/placeOrder', completeOrder)
router.get('/user/:userId', getOrders);
router.get('/orders/:id', getOrder);
router.patch('/orders/:id', updateOrder);

module.exports = router;
