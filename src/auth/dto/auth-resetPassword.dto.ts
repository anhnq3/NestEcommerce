import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({
    example: 'changedpassword',
    required: true,
    format: 'string',
    minLength: 6,
  })
  @IsString()
  @Length(6)
  @IsOptional()
  password: string;
}
