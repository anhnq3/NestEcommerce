import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    example: 'changedpassword',
    required: true,
    format: 'string',
    minLength: 4,
    maxLength: 24,
  })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @Length(4, 255)
  @IsOptional()
  password: string;

  @ApiProperty({
    example: 'changedemail@gmail.com',
    required: true,
    format: 'string',
    minLength: 4,
    maxLength: 24,
  })
  @IsString()
  @IsEmail()
  @IsOptional()
  @Length(4, 255)
  @IsOptional()
  email: string;

  @ApiProperty({
    example: 'true',
    required: true,
    format: 'string',
  })
  @IsBoolean()
  @IsOptional()
  isAdmin: boolean;

  @ApiProperty({
    example: '0123456789',
    required: true,
    format: 'string',
    minLength: 10,
    maxLength: 11,
  })
  @IsString()
  @IsOptional()
  phone: string;
}
