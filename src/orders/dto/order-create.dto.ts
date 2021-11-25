import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';
import { Schema } from 'mongoose';

export class CreateOrderDto {
  @ApiProperty({
    example: '6197432b4d4b3f1fd9f42cd4',
    required: true,
    format: 'objectid',
  })
  @IsMongoId()
  @IsNotEmpty()
  products: Schema.Types.ObjectId;

  // @ApiProperty({
  //   example: 1000,
  //   required: true,
  //   format: 'number',
  // })
  // @IsNumber()
  // @IsNotEmpty()
  // price: number;

  @ApiProperty({
    example: 1,
    required: true,
    format: 'number',
  })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  // @IsNumber()
  // @IsNotEmpty()
  // total: number;
  // @ApiProperty({
  //   example: '6197432b4d4b3f1fd9f42cd4',
  //   required: false,
  //   // format: 'objectI',
  // })
  // @IsMongoId()
  // @IsNotEmpty()
  // readonly products: Schema.Types.ObjectId;
  // //This price is in service after get selling price
  // //   @ApiProperty({
  // //     example: 1000,
  // //     required: true,
  // //     format: 'number',
  // //   })
  // //   readonly price: number;
  // @ApiProperty({
  //   example: 1,
  //   required: true,
  //   format: 'number',
  // })
  // @IsNumber()
  // @IsNotEmpty()
  // readonly quantity: number;
  // // This total will handle in service
  // readonly total: number;
}
