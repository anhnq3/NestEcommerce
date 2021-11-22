import { Document } from 'mongoose';

export interface Vouchers {
  readonly voucherName: string;
  readonly voucherDiscount: number;
  readonly voucherStartDate: Date;
  readonly voucherEndDate: Date;
  readonly voucherStatus: string;
  readonly voucherQuantity: number;
  readonly voucherCode: string;
}
export type VoucherDoc = Document & Vouchers;
