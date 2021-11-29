import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // SERCRET_TOKEN compare with env before
      secretOrKey: process.env.SECRET_TOKEN,
    });
  }

  async validate(payload: any) {
    const { username, email } = payload;
    const user = await this.authService.validatorUser(username, email);
    if (!user) throw new UnauthorizedException('Invalid Token');
    return payload;
  }
}
