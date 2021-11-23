import { Schema } from 'mongoose';

const PRODUCTS_MODEL = 'products';
const ProductsSchema = new Schema(
  {
    // categoryId: { type: String, required: true, trim: true },
    flashsales: {
      type: Schema.Types.ObjectId,
      ref: 'flashsales',
      default: '000000000000000000000000',
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'category',
      default: '000000000000000000000000',
    },
    productCode: { type: String, unique: true, trim: true },
    productName: { type: String, required: true, unique: true, trim: true },
    importprice: { type: Number, required: true, trim: true },
    sellingprice: { type: Number, trim: true },
    weight: { type: Number, required: true, trim: true },
    mainimg: { type: String, trim: true },
    imgs: [],
    // imgs: { type: String, trim: true },
    quantity: { type: Number, trim: true },
    description: { type: String, trim: true, default: 'Empty description' },
  },
  { timestamps: true },
);

export { ProductsSchema, PRODUCTS_MODEL };
