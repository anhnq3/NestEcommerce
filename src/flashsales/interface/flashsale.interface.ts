import { Document } from 'mongoose';

export interface FlashSales {
  readonly flashSaleName: string;
  readonly flashSaleQuantity: number;
  readonly flashSaleStartDate: Date;
  readonly flashSaleEndDate: Date;
  readonly flashSaleDetail: string;
  readonly flashSaleDiscount: number;
  readonly flashSaleStatus: string;
  // readonly flashSaleCode: string;
}
export type FlashSalesDoc = Document & FlashSales;
