// Importing necessary modules and dependencies
import express from 'express';
import Product from '../models/productModel.js';

const productRouter = express.Router();

// GET /api/v1/products
// Endpoint for retrieving all products
productRouter.get('/', async (req, res) => {
  // Fetching all products from the database using the Product model
  const products = await Product.find();
  
  res.send(products);
});

// GET /api/v1/products/token/:token
// Endpoint for retrieving a product by token
productRouter.get('/token/:token', async (req, res) => {
  // Extracting the token from the request parameters
  const token = req.params.token;
  
  // Finding a product with the provided token in the database
  const product = await Product.findOne({ token });

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product was not found' });
  }
});

// GET /api/v1/products/:id
// Endpoint for retrieving a product by ID
productRouter.get('/:id', async (req, res) => {
  // Extracting the ID from the request parameters
  const id = req.params.id;
  
  // Finding a product with the provided ID in the database
  const product = await Product.findById(id);

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product was not found' });
  }
});

export default productRouter;
