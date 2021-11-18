import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsSchema, PRODUCTS_MODEL } from './schema/products.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PRODUCTS_MODEL, schema: ProductsSchema },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
