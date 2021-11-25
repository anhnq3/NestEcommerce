import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  FlashSalesSchema,
  FLASHSALES_MODEL,
} from 'src/flashsales/schema/flashsales.schema';
import {
  ProductsSchema,
  PRODUCTS_MODEL,
} from 'src/products/schema/products.schema';
import { UsersSchema, USERS_MODEL } from 'src/users/shcema/users.schema';
import { CronService } from './cron.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FLASHSALES_MODEL, schema: FlashSalesSchema },
    ]),
    MongooseModule.forFeature([
      { name: PRODUCTS_MODEL, schema: ProductsSchema },
    ]),
    MongooseModule.forFeature([{ name: USERS_MODEL, schema: UsersSchema }]),
  ],
  providers: [CronService],
})
export class CronModule {}
