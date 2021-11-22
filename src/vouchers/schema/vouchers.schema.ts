import { Schema } from 'mongoose';

const VOUCHERS_MODEL = 'vouchers';
const VouchersSchema = new Schema({
  voucherName: { type: String, unique: true, required: true, trim: true },
  voucherDiscount: { type: Number, trim: true, default: 0 },
  voucherStartDate: { type: Date, required: true, trim: true },
  voucherEndDate: { type: Date, required: true, trim: true },
  voucherStatus: { type: String, trim: true, default: 'inactive' },
  voucherQuantity: { type: Number, trim: true, default: 1 },
  voucherCode: { type: String, required: true, trim: true },
});
export { VOUCHERS_MODEL, VouchersSchema };
