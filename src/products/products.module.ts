import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { CategoryModule } from 'src/category/category.module';
import {
  CategorySchema,
  CATEGORY_MODEL,
} from 'src/category/schema/category.schema';
import {
  FlashSalesSchema,
  FLASHSALES_MODEL,
} from 'src/flashsales/schema/flashsales.schema';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsSchema, PRODUCTS_MODEL } from './schema/products.schema';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads/img',
    }),
    MongooseModule.forFeature([
      { name: PRODUCTS_MODEL, schema: ProductsSchema },
    ]),
    MongooseModule.forFeature([
      { name: CATEGORY_MODEL, schema: CategorySchema },
    ]),
    MongooseModule.forFeature([
      { name: FLASHSALES_MODEL, schema: FlashSalesSchema },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
