import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNumber, IsOptional } from 'class-validator';
import { Schema } from 'mongoose';

export class UpdateOrderDto {
  @ApiProperty({
    example: 1,
    required: true,
    format: 'number',
  })
  @IsMongoId()
  @IsOptional()
  readonly quantity: number;

  @ApiProperty({
    example: 1,
    format: 'string',
  })
  @IsNumber()
  @IsOptional()
  readonly voucher: Schema.Types.ObjectId;
  // @ApiProperty({
  //   example: '619dd837773e65158d14370f',
  //   format: 'objectid',
  // })
  // @IsMongoId()
  // readonly vouchers: Schema.Types.ObjectId;
}
