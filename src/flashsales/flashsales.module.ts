import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FlashsalesController } from './flashsales.controller';
import { FlashsalesService } from './flashsales.service';
import { FlashSalesSchema, FLASHSALES_MODEL } from './schema/flashsales.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FLASHSALES_MODEL, schema: FlashSalesSchema },
    ]),
  ],
  providers: [FlashsalesService],
  controllers: [FlashsalesController],
})
export class FlashsalesModule {}
