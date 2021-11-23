import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Schema } from 'mongoose';

export class UpdateProductDto {
  @ApiProperty({
    example: '6197432b4d4b3f1fd9f42cd4',
    required: false,
    format: 'string',
  })
  @IsOptional()
  @IsMongoId()
  category: Schema.Types.ObjectId;

  @ApiProperty({
    example: '6197432b4d4b3f1fd9f42cd4',
    required: false,
    format: 'string',
  })
  @IsOptional()
  @IsMongoId()
  flashsales: Schema.Types.ObjectId;

  @ApiProperty({
    example: 'product name',
    required: true,
    format: 'string',
    minLength: 6,
    maxLength: 24,
  })
  @IsString()
  @IsOptional()
  productName: string;

  @ApiProperty({
    example: 'PRODUCT1',
    format: 'string',
  })
  @IsString()
  @IsOptional()
  productCode: string;

  @ApiProperty({
    example: 1000,
    required: true,
    format: 'number',
  })
  @IsNumber()
  @IsOptional()
  importprice: number;

  @ApiProperty({
    example: 0,
    required: true,
    format: 'number',
    minLength: 6,
    maxLength: 24,
  })
  @IsNumber()
  @IsOptional()
  sellingprice: number;

  @ApiProperty({
    example: 1,
    required: true,
    format: 'number',
    minLength: 6,
    maxLength: 24,
  })
  @IsNumber()
  @IsOptional()
  weight: number;

  @ApiProperty({
    example: 'None',
    required: false,
    format: 'string',
  })
  @IsOptional()
  @IsString()
  mainimg: string;

  @ApiProperty({
    example: ['img1', 'img2'],
    required: false,
    format: 'string',
  })
  @IsOptional()
  @IsArray()
  // @IsString()
  imgs: string;

  @ApiProperty({
    example: 1,
    required: true,
    format: 'number',
    minLength: 6,
    maxLength: 24,
  })
  @IsNumber()
  @IsOptional()
  quantity: number;

  @ApiProperty({
    example: 'Empty description',
    required: false,
    format: 'string',
    minLength: 6,
    maxLength: 24,
  })
  @IsString()
  @IsOptional()
  description: string;
}
