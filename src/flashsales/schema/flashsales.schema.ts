import { Schema } from 'mongoose';

const FLASHSALES_MODEL = 'flashsales';
const FlashSalesSchema = new Schema({
  flashSaleName: { type: String, unique: true, required: true, trim: true },
  flashSaleQuantity: { type: Number, trim: true, default: 1 },
  flashSaleStartDate: { type: Date, required: true, trim: true },
  flashSaleEndDate: { type: Date, required: true, trim: true },
  flashSaleDetail: { type: String, trim: true, default: 'Flash sale detail' },
  flashSaleDiscount: { type: Number, trim: true, default: 0 },
  flashSaleStatus: { type: String, trim: true, default: 'inactive' },
  // flashSaleCode: { type: String, unique: true, trim: true, required: true },
});

export { FlashSalesSchema, FLASHSALES_MODEL };
