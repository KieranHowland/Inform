import express from 'express';
import Product from '../models/Product';
import { ErrorMessage } from '../util/ErrorMessage';

const router = express.Router();

// Get a specific product
router.get('/:upc', async (req, res) => {
  // Find the product by its UPC
  const product = await Product.findOne({ UPC: req.params.upc });

  // If no product is found, return an error, else return the product
  if (!product) {
    return res.status(404).send({ error: ErrorMessage.PRODUCT_NOT_FOUND });
  } else {
    return res.send(product);
  }
});

// Query products using search term
router.get('/search/:term', async (req, res) => {
  // Use a regular expression to search for the term in the name and description fields
  const searchTerm = new RegExp(req.params.term, 'i');
  const products = await Product.find({
    $or: [
      { name: searchTerm },
      { description: searchTerm },
    ],
  });

  // If no products are found, return an error
  if (products.length === 0) {
    return res.status(404).send({ error: ErrorMessage.PRODUCT_NOT_FOUND });
  } else {
    return res.send(products);
  }
});

// Create a new product
router.post('/', async (req, res) => {
  // Create a new product with the request body
  const existingProduct = await Product.findOne({ UPC: req.body.UPC });
  if (existingProduct) {
    return res.status(400).send({ error: ErrorMessage.PRODUCT_ALREADY_EXISTS });
  }

  let product = new Product(req.body);
  console.log(req.body);
  const error = product.validateSync();
  if (error) {
    console.log(error);
    return res.status(400).send({ error: ErrorMessage.INVALID_PRODUCT_DATA });
  } else {
    await product.save();
    return res.send(product);
  }
});

// Update an existing product
router.put('/:upc', async (req, res) => {
  // Find the product by its UPC
  const product = await Product.findOne({ UPC: req.params.upc });

  // If no product is found, return an error
  if (!product) {
    return res.status(404).send({ error: ErrorMessage.PRODUCT_NOT_FOUND });
  }

  // Update the product with the request body
  Object.assign(product, req.body);
  const error = product.validateSync();
  if (error) {
    return res.status(400).send({ error: ErrorMessage.INVALID_PRODUCT_DATA });
  } else {
    await product.save();
    return res.send(product);
  }
});


// Delete a product
router.delete('/:upc', async (req, res) => {

  // Find and delete the product by its UPC
  const product = await Product.findOneAndDelete({ UPC: req.params.upc });

  // If no product is found, return an error, else return the product
  if (!product) {
    return res.status(404).send({ error: ErrorMessage.PRODUCT_NOT_FOUND });
  } else {
    return res.send(product);
  }
});

export { router as productsRouter };