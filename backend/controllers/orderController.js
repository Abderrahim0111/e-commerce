const Order = require("../models/orderSchema");
const jwt = require('jsonwebtoken')

const createOrder = async (req, res) => {
  const { products, user, phone, address, city } = req.body;
  if (!products || !user || !phone || !address || !city) {
    return res.json({ error: "not allowed" });
  }
  try {
    const order = await Order.create(req.body);
    let populatedOrder = await Order.findById(order._id).populate("products.product")
    populatedOrder = await Order.findById(order._id).populate("user", "-password")
    res.json(populatedOrder);
  } catch (error) {
    res.json({ error: error });
  }
};

const fetchUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({user: req.params.userId}).populate("products.product").sort({updatedAt: -1})

    res.json(orders)
  } catch (error) {
    res.json({error: error})
  }
}

const deleteUserOrder = async (req, res) => {
  try {
    const deleted = await Order.deleteOne({_id: req.params.orderId})
    if(!deleted){
      res.json({error: 'delete error'})
    }
    res.json({message: 'order deleted successfully'})
  } catch (error) {
    res.json({error: error})
  }
}

const fetchAllOrders = async (req, res) => {
  const token = req.cookies.jwt
  const decoded = await jwt.verify(token, process.env.JWT)
  if(decoded.id !== process.env.ADMIN){
    return res.json({error: 'admin only'})
  }
  try {
    const orders = await Order.find().populate('products.product').populate('user').sort({updatedAt: -1})
    res.json(orders)
  } catch (error) {
    res.json({error: error})
  }
}

const updateOrder =  async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(req.params.orderId, req.body, {new: true}).populate("products.product")
    if(!updated){
      return res.json({error: 'update error'})
    }
    res.json(updated)
  } catch (error) {
    res.json({error: error})
  }
}

const fetchOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate("products.product").populate('user')
    res.json(order)
  } catch (error) {
    res.json({error: error})
  }
}

module.exports = {
  createOrder,
  fetchUserOrders,
  deleteUserOrder,
  fetchAllOrders,
  updateOrder,
  fetchOrder
};
