import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AuthService } from './auth.service';
import { ForgotAuthDto } from './dto/auth-forgot.dto';
import { LoginAuthDto } from './dto/Auth-login.dto';
import { ResetPasswordDto } from './dto/auth-resetPassword.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  // @Get()
  // testing() {
  //   return this.AuthService.testing();
  // }

  @ApiTags('Auth')
  @ApiOperation({ summary: 'Login an user' })
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('login')
  async login(@Body() loginAuthDto: LoginAuthDto) {
    return this.AuthService.login(loginAuthDto);
  }

  @ApiTags('Auth')
  @ApiOperation({ summary: 'Forgot password (send email)' })
  @HttpCode(HttpStatus.OK)
  @Post('forgot')
  @UsePipes(new ValidationPipe({ transform: true }))
  async forgot(@Body() forgotAuthDto: ForgotAuthDto) {
    // const { email } = forgotAuthDto;
    return this.AuthService.forgot(forgotAuthDto);
  }

  @ApiTags('Auth')
  @ApiOperation({ summary: 'Reset password using token' })
  @HttpCode(HttpStatus.OK)
  @Post('/forgot/:token')
  async resetToken(
    @Param('token') token: string,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    return this.AuthService.resetPassword(token, resetPasswordDto);
  }
}
