import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class LoginAuthDto {
  @ApiProperty({
    example: 'username',
    required: true,
    format: 'string',
    minLength: 6,
    maxLength: 24,
  })
  @IsString()
  @IsOptional()
  readonly username?: string;

  @ApiProperty({
    example: 'username@gmail.com',
    required: true,
    format: 'string',
    minLength: 6,
  })
  @IsString()
  @IsOptional()
  readonly email?: string;

  @ApiProperty({
    example: 'password',
    required: true,
    format: 'string',
    minLength: 4,
    maxLength: 24,
  })
  @IsNotEmpty()
  @IsString()
  @Length(4, 24)
  readonly password: string;
}
