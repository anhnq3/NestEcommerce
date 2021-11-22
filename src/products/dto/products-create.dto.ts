import { ApiProperty } from '@nestjs/swagger';
import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductsDto {
  // categoryId: { type: string; required: true; trim: true };
  // productName: { type: string; required: true; unique: true; trim: true };
  // barcode: { type: number; required: true; unique: true; trim: true };
  // importprice: { type: number; required: true; trim: true };
  // sellingprice: { type: number; trim: true };
  // weight: { type: number; required: true; trim: true };
  // mainimg: { type: string; trim: true };
  // imgs: { type: string; trim: true };
  // quantity: { type: number; trim: true };
  // description: { type: string; trim: true; default: 'Empty description' };
  @ApiProperty({
    example: '6197432b4d4b3f1fd9f42cd4',
    required: false,
    format: 'string',
  })
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  categoryId: string;

  @ApiProperty({
    example: 'product name',
    required: true,
    format: 'string',
    minLength: 6,
    maxLength: 24,
  })
  @IsString()
  @IsNotEmpty()
  productName: string;

  @ApiProperty({
    example: 1000,
    required: true,
    format: 'number',
  })
  @IsNumber()
  @IsNotEmpty()
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
    example: 'None',
    required: false,
    format: 'string',
  })
  @IsOptional()
  @IsString()
  imgs: string;

  @ApiProperty({
    example: 1,
    required: true,
    format: 'number',
    minLength: 6,
    maxLength: 24,
  })
  @IsNumber()
  @IsNotEmpty()
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
