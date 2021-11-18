import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class ForgotAuthDto {
  @ApiProperty({
    example: 'username@gmail.com',
    required: true,
    format: 'string',
    minLength: 6,
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Length(6)
  readonly email: string;
  readonly username: string;
}
