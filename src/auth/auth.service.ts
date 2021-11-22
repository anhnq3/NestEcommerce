import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersDoc } from 'src/users/interface/users.interface';
import { USERS_MODEL } from 'src/users/shcema/users.schema';
import { LoginAuthDto } from './dto/Auth-login.dto';
import * as bcrypt from 'bcrypt';
import { ForgotAuthDto } from './dto/auth-forgot.dto';
import * as crypto from 'crypto';
import * as moment from 'moment';
import { JwtService } from '@nestjs/jwt';
import { sendEmail } from 'src/users/helper/sendmail';
import { ResetPasswordDto } from './dto/auth-resetPassword.dto';
import { checkExpired } from 'src/users/helper/checkExpired';

@Injectable()
export class AuthService {
  constructor(
    // This is to decalre a UsersDoc
    @InjectModel(USERS_MODEL)
    private readonly userModel: Model<UsersDoc>,

    private readonly jwtService: JwtService,
  ) {}

  async login(loginAuthDto: LoginAuthDto): Promise<any> {
    const { username, password, email } = loginAuthDto;
    const user_login = !!username ? { username } : { email };
    const user = await this.userModel.findOne(user_login);

    if (!user) {
      throw new HttpException('Incorrect username', HttpStatus.NOT_FOUND);
    }
    // const bcryptCheck = await bcrypt.compare(password, user.password);
    const bcryptCheck = await bcrypt.compare(password, user.password);

    if (!bcryptCheck)
      throw new HttpException('Incorrect password', HttpStatus.NOT_FOUND);

    const payload = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    return {
      id: user._id,
      username: user.username,
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_TOKEN,
        expiresIn: process.env.JWT_SERCRET_TOKEN_EXPIRES,
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_REFRESH_TOKEN,
        expiresIn: process.env.JWT_SERCRET_REFRESH_TOKEN_EXPIRES,
      }),
    };
  }

  async forgot(forgotAuthDto: ForgotAuthDto): Promise<any> {
    try {
      const { email } = forgotAuthDto;
      // this.userModel.findOne({ email: email });
      const user = await this.userModel.findOne({ email });
      if (!user) {
        throw new HttpException('Email not found', HttpStatus.NOT_FOUND);
        // throw new UnauthorizedException();
      }
      const token = crypto.randomBytes(32).toString('hex');
      const htmlTemplate = `
      -----------------------------RESET YOUR PASSWORD-----------------------------
      Please click here to reset your user(${user.username}) password:   http://localhost:3000/auth/forgot/${token}
      `;
      sendEmail('anhnq3@vmodev.com', 'Reset your password', htmlTemplate);
      // sendEmail(email, 'Verify your account', htmlTemplate);
      await user.updateOne({
        token: token,
        tokenSubject: 'forgot',
        tokenExpires: moment().add(30, 'minutes').toDate(),
        // tokenExpires: new Date(Number(Date.now() + 60000 * 30)),
      }); // 6000 is 1 minute });
      return {
        message: `Email has been sent to ${email}`,
      };
    } catch (err) {
      return {
        error: err,
        message: 'Error',
      };
    }
  }

  async resetPassword(
    token: string,
    resetPasswordAuthDto: ResetPasswordDto,
  ): Promise<any> {
    const user = await this.userModel.findOne({ token });
    if (!user)
      throw new HttpException('Token not found', HttpStatus.BAD_REQUEST);

    const expiredDate = user.tokenExpires;
    if (checkExpired(expiredDate))
      throw new HttpException('Token has been expired', HttpStatus.BAD_GATEWAY);

    const hashed = await bcrypt.hash(resetPasswordAuthDto['password'], 10);

    const reset = await user.updateOne({
      password: hashed,
      token: '',
      tokenExpires: new Date(0),
      tokenSubject: '',
    });
    if (!reset)
      throw new HttpException(`Password hasn't change`, HttpStatus.BAD_REQUEST);
    return {
      message: 'Password has reseted',
    };
  }
}
