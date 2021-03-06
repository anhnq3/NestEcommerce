import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ProductsSchema,
  PRODUCTS_MODEL,
} from 'src/products/schema/products.schema';
import { FlashsalesController } from './flashsales.controller';
import { FlashsalesService } from './flashsales.service';
import { FlashSalesSchema, FLASHSALES_MODEL } from './schema/flashsales.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FLASHSALES_MODEL, schema: FlashSalesSchema },
    ]),
    MongooseModule.forFeature([
      { name: PRODUCTS_MODEL, schema: ProductsSchema },
    ]),
  ],
  providers: [FlashsalesService],
  controllers: [FlashsalesController],
})
export class FlashsalesModule {}
