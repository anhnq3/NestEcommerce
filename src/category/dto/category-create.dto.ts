import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Category name',
    required: true,
    format: 'string',
    minLength: 6,
    maxLength: 24,
  })
  @IsString()
  @IsNotEmpty()
  @Length(6, 24)
  readonly categoryname: string;

  @ApiProperty({
    example: 'Category icon',
    required: true,
    format: 'string',
    minLength: 6,
    maxLength: 24,
  })
  @IsString()
  @IsNotEmpty()
  @Length(6, 24)
  readonly categoryicon: string;
}
