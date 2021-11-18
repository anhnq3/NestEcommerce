import { Schema } from 'mongoose';

const PRODUCTS_MODEL = 'products';
const ProductsSchema = new Schema({
  isAdmin: {
    type: Boolean,
    // select: true,
    default: false,
  },
  categoryId: {
    type: String,
  },
  barcode: {
    type: String,
    unique: true,
    default: 0,
  },
  importprice: {
    type: Number,
    default: 0,
  },
  sellingprice: {
    type: Number,
    default: 0,
  },
  weight: {
    type: Number,
    default: 1,
  },
  mainimg: {
    type: String,
  },
  imgs: {
    type: String,
    default: '',
  },
  quantity: {
    type: Number,
    default: 1,
  },
  description: {
    type: String,
    default: 'Description empty',
  },
});

export { ProductsSchema, PRODUCTS_MODEL };
