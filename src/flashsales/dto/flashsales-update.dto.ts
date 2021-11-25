import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateFlashSaleDto {
  @ApiProperty({
    example: 'flash sale name',
    // required: true,
    format: 'string',
  })
  @IsString()
  @IsOptional()
  readonly flashSaleName: string;

  @ApiProperty({
    example: 1,
    // required: true,
    format: 'number',
  })
  @IsNumber()
  @IsOptional()
  readonly flashSaleQuantity: number;

  @ApiProperty({
    example: '2021-11-19T08:20:17.597+08:00',
    // required: true,
    format: 'Date',
  })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  readonly flashSaleStartDate: Date;

  @ApiProperty({
    example: '2021-11-20T08:20:17.597+08:00',
    // required: true,
    format: 'Date',
  })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  readonly flashSaleEndDate: Date;

  @ApiProperty({
    example: 'This is flash sale detail',
    // required: true,
    format: 'string',
  })
  @IsString()
  @IsOptional()
  readonly flashSaleDetail: string;

  @ApiProperty({
    example: 10,
    format: 'number',
  })
  @IsNumber()
  @IsOptional()
  readonly flashSaleDiscount: number;

  @ApiProperty({
    example: 'active',
    format: 'string',
  })
  @IsString()
  @IsOptional()
  readonly flashSaleStatus: string;

  // @ApiProperty({
  //   example: 'CODE',
  //   // required: true,
  //   format: 'string',
  // })
  // @IsString()
  // @IsOptional()
  // flashSaleCode: string;
}
