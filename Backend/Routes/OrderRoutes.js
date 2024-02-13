
const express = require('express');
const orderRouter = express.Router();
const orderController = require('../Controller/OrderController')

orderRouter
.post('/add-order', orderController.orderAdd)
.get('/get-order', orderController.getOrderDetail)
.get('/', orderController.getAllOrders)

exports.orderRouter = orderRouter