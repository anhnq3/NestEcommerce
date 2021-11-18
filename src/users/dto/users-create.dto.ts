// This is a Create validation

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUsersDto {
  @ApiProperty({
    example: 'username',
    required: true,
    format: 'string',
    minLength: 6,
    maxLength: 24,
  })
  @IsString()
  @IsNotEmpty()
  @Length(6, 24)
  readonly username: string;

  @ApiProperty({
    example: 'username@gmail.com',
    required: true,
    format: 'email',
    minLength: 6,
    maxLength: 24,
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @Length(6, 24)
  readonly email: string;

  @ApiProperty({
    example: 'password',
    required: true,
    format: 'string',
    minLength: 4,
    maxLength: 24,
  })
  @IsNotEmpty()
  @Length(4, 255)
  password: string;
}
