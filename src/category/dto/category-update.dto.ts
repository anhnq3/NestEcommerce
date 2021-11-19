import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({
    example: 'Category name',
    required: true,
    format: 'string',
    minLength: 6,
    maxLength: 24,
  })
  @IsString()
  @IsOptional()
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
  @IsOptional()
  @Length(6, 24)
  readonly categoryicon: string;
}
