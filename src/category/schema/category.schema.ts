import { Schema } from 'mongoose';
import { timestamp } from 'rxjs';

const CATEGORY_MODEL = 'category';
const CategorySchema = new Schema(
  {
    categoryname: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    categoryicon: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);
export { CATEGORY_MODEL, CategorySchema };
