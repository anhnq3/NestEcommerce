import { Document } from 'mongoose';

export interface Products {
  readonly abs: string;
}
export type ProductsDoc = Document & Products;
