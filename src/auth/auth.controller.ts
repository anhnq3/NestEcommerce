import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AuthService } from './auth.service';
import { ForgotAuthDto } from './dto/auth-forgot.dto';
import { LoginAuthDto } from './dto/Auth-login.dto';
import { ResetPasswordDto } from './dto/auth-resetPassword.dto';
import { GetUser } from './helper/getUser.decorator';
import { JwtAuthGuard } from './helper/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('Auth')
  @ApiOperation({ summary: 'Login an user' })
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('login')
  async login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @ApiTags('Auth')
  @ApiOperation({ summary: 'Forgot password (send email)' })
  @HttpCode(HttpStatus.OK)
  @Post('forgot')
  @UsePipes(new ValidationPipe({ transform: true }))
  async forgot(@Body() forgotAuthDto: ForgotAuthDto) {
    // const { email } = forgotAuthDto;
    return this.authService.forgot(forgotAuthDto);
  }

  @ApiTags('Auth')
  @ApiOperation({ summary: 'Reset password using token' })
  @HttpCode(HttpStatus.OK)
  @Post('/forgot/:token')
  async resetToken(
    @Param('token') token: string,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    return this.authService.resetPassword(token, resetPasswordDto);
  }

  @ApiTags('Auth')
  @ApiOperation({ summary: 'Get me' })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  // Bearer co lien quan
  @ApiBearerAuth()
  @Get('profile')
  async getMe(@GetUser() payload: any) {
    // console.log(payload);
    return this.authService.getMe(payload);
  }
}
