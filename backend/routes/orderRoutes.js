const express = require('express')
const { createOrder, fetchUserOrders, deleteUserOrder, fetchAllOrders, updateOrder, fetchOrder } = require('../controllers/orderController')
const router = express.Router()

router.post('/createOrder', createOrder)
router.get('/fetchUserOrders/:userId', fetchUserOrders)
router.delete('/deleteUserOrder/:orderId', deleteUserOrder)
router.get('/fetchAllOrders', fetchAllOrders)
router.put('/updateOrder/:orderId', updateOrder)
router.get('/fetchOrder/:orderId', fetchOrder)

module.exports = router