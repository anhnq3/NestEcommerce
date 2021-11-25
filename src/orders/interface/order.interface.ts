import { Document, Schema } from 'mongoose';

export interface Orders {
  readonly products: Schema.Types.ObjectId;
  readonly voucher: Schema.Types.ObjectId;
  readonly price: number;
  readonly quantity: number;
  readonly total: number;
}

export type OrdersDoc = Document & Orders;
