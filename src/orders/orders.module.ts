import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersSchema, ORDERS_MODEL } from './schema/orders.schema';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ProductsSchema,
  PRODUCTS_MODEL,
} from 'src/products/schema/products.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ORDERS_MODEL, schema: OrdersSchema }]),
    MongooseModule.forFeature([
      { name: PRODUCTS_MODEL, schema: ProductsSchema },
    ]),
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
