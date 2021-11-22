import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateFlashSaleDto {
  @ApiProperty({
    example: 'flash sale name',
    required: true,
    format: 'string',
    // minLength: 6,
    // maxLength: 24,
  })
  @IsString()
  @IsNotEmpty()
  flashSaleName: string;

  @ApiProperty({
    example: 1,
    required: true,
    format: 'number',
  })
  @IsNumber()
  @IsNotEmpty()
  flashSaleQuantity: number;

  @ApiProperty({
    example: '2021-11-19T08:20:17.597+08:00',
    required: true,
    format: 'Date',
  })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  flashSaleStartDate: Date;

  @ApiProperty({
    example: '2021-11-20T08:20:17.597+08:00',
    required: true,
    format: 'Date',
  })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  flashSaleEndDate: Date;

  @ApiProperty({
    example: 'This is flash sale detail',
    required: true,
    format: 'string',
  })
  @IsString()
  @IsOptional()
  flashSaleDetail: string;

  @ApiProperty({
    example: 10,
    format: 'number',
  })
  @IsNumber()
  @IsOptional()
  flashSaleDiscount: number;

  @ApiProperty({
    example: 'active',
    format: 'string',
  })
  @IsString()
  @IsOptional()
  flashSaleStatus: string;

  // @ApiProperty({
  //   example: 'CODE',
  //   required: true,
  //   format: 'string',
  // })
  // @IsString()
  // @IsNotEmpty()
  // flashSaleCode: string;
}
