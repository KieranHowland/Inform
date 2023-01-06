import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Product from './src/models/Product';
import cors from 'cors';
import helmet from 'helmet';

import { ErrorMessage } from './src/util/ErrorMessage';

import { productsRouter } from './src/routes/products';

// Connect to the inform database on the localhost
mongoose.connect('mongodb://localhost:27017/inform');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

app.use('/products', productsRouter);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});