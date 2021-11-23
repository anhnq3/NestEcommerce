import { Document, Schema } from 'mongoose';

export interface Products {
  readonly category: Schema.Types.ObjectId;
  readonly flashSales: Schema.Types.ObjectId;
  readonly productName: string;
  readonly productCode: string;
  readonly importprice: number;
  readonly sellingprice: number;
  readonly weight: number;
  readonly mainimg: string;
  readonly imgs: string;
  readonly quantity: number;
  readonly description: string;
}
export type ProductsDoc = Document & Products;
