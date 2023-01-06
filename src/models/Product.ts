import * as mongoose from 'mongoose';

interface Product {
  UPC: string;
  SKU: string;
  name: string;
  photo: string;
  price: number;
  location: string;
  description: string;
}

const productSchema = new mongoose.Schema({
  UPC: {
    type: String,
    required: true
  },
  SKU: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  photo: String,
  price: {
    type: Number,
    required: true
  },
  location: String,
  description: String
});

export default mongoose.model<Product>('Product', productSchema);
