import express from 'express';
import Product from '../models/productModel.js';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

productRouter.get('/token/:token', async (req, res) => {
  const token = req.params.token;
  const product = await Product.findOne({ token });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product was not found' });
  }
});

productRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product was not found' });
  }
});

export default productRouter;
