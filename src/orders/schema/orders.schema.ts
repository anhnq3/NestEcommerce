import { Schema } from 'mongoose';
const ORDERS_MODEL = 'orders';
const OrdersSchema = new Schema({
  products: {
    type: Schema.Types.ObjectId,
    ref: 'products',
    default: '000000000000000000000000',
  },
  vouchers: {
    type: Schema.Types.ObjectId,
    ref: 'vouchers',
    default: '000000000000000000000000',
  },
  price: { type: Number, trim: true, required: true },
  quantity: { type: Number, trim: true, required: true },
  total: { type: Number, trim: true, required: true },
});
export { ORDERS_MODEL, OrdersSchema };
