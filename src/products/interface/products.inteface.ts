import { Document } from 'mongoose';

export interface Products {
  readonly categoryId: string;
  readonly productName: string;
  readonly importprice: number;
  readonly sellingprice: number;
  readonly weight: number;
  readonly mainimg: string;
  readonly imgs: string;
  readonly quantity: number;
  readonly description: string;
}
export type ProductsDoc = Document & Products;
