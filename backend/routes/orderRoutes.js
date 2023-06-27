import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import { isAuth } from '../utils.js';

const orderRouter = express.Router();

orderRouter.get(
  '/history/:_id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    console.log('id from server: ', req.params._id);
    try {
      const userById = await User.findById(req.params._id);
      console.log(userById);
      const orders = await Order.find({ user: userById });
      res.status(201).send(orders);
    } catch (err) {
      res.status(404).send({ message: 'User not found' });
    }
  })
);

// Create a New Order
orderRouter.post(
  '/',
  isAuth, // Middleware: Authentication required
  expressAsyncHandler(async (req, res) => {
    const newOrder = new Order({
      orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    });

    const order = await newOrder.save();
    res.status(201).send({ message: 'New Order Created', order });
  })
);
// Retrieve an Order by ID
orderRouter.get(
  '/:id',
  isAuth, // Middleware: Authentication required
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: 'Order not found' });
    }
  })
);

export default orderRouter;
