import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductsDto {
  @ApiProperty({
    example: '1',
    required: false,
    format: 'string',
  })
  @IsString()
  @IsNotEmpty()
  categoryId: {
    type: number;
  };

  @ApiProperty({
    example: 'product name',
    required: true,
    format: 'string',
    minLength: 6,
    maxLength: 24,
  })
  @IsString()
  @IsNotEmpty()
  productname: {
    type: string;
  };

  @ApiProperty({
    example: '1000',
    required: true,
    format: 'number',
    minLength: 6,
    maxLength: 24,
  })
  @IsNumber()
  @IsNotEmpty()
  importprice: {
    type: number;
    default: 0;
  };

  @ApiProperty({
    example: '0',
    required: true,
    format: 'email',
    minLength: 6,
    maxLength: 24,
  })
  @IsNumber()
  @IsOptional()
  sellingprice: {
    type: number;
    default: 0;
  };

  @ApiProperty({
    example: '1',
    required: true,
    format: 'email',
    minLength: 6,
    maxLength: 24,
  })
  @IsNumber()
  @IsOptional()
  weight: {
    type: number;
    default: 1;
  };

  @ApiProperty({
    example: 'None',
    required: false,
    format: 'email',
  })
  @IsOptional()
  @IsString()
  mainimg: {
    type: string;
  };

  @ApiProperty({
    example: 'None',
    required: false,
    format: 'email',
  })
  @IsOptional()
  @IsString()
  imgs: {
    type: string;
  };

  @ApiProperty({
    example: '1',
    required: true,
    format: 'email',
    minLength: 6,
    maxLength: 24,
  })
  @IsNumber()
  @IsNotEmpty()
  quantity: {
    type: number;
    default: 1;
  };

  @ApiProperty({
    example: 'Empty description',
    required: false,
    format: 'email',
    minLength: 6,
    maxLength: 24,
  })
  @IsString()
  @IsOptional()
  description: {
    type: string;
  };
}
