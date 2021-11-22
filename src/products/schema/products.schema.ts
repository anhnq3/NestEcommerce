import { Schema } from 'mongoose';

const PRODUCTS_MODEL = 'products';
const ProductsSchema = new Schema({
  // categoryId: { type: String, required: true, trim: true },
  categoryId: { type: Schema.Types.ObjectId, ref: 'category' },
  productName: { type: String, required: true, unique: true, trim: true },
  importprice: { type: Number, required: true, trim: true },
  sellingprice: { type: Number, trim: true },
  weight: { type: Number, required: true, trim: true },
  mainimg: { type: String, trim: true },
  imgs: { type: String, trim: true },
  quantity: { type: Number, trim: true },
  description: { type: String, trim: true, default: 'Empty description' },
});

export { ProductsSchema, PRODUCTS_MODEL };
