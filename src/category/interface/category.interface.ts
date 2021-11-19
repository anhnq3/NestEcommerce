import { Document } from 'mongoose';

interface Category {
  readonly categoryname: string;
  readonly categoryicon: string;
}

export type CategoryDoc = Document & Category;
