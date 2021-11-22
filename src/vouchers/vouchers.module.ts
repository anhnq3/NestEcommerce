import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VouchersSchema, VOUCHERS_MODEL } from './schema/vouchers.schema';
import { VouchersController } from './vouchers.controller';
import { VouchersService } from './vouchers.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: VOUCHERS_MODEL, schema: VouchersSchema },
    ]),
  ],
  providers: [VouchersService],
  controllers: [VouchersController],
})
export class VouchersModule {}
