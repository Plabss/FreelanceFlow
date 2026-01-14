import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // 1. Where to look for the token? (In the Authorization header)
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // 2. Use the same secret key we defined earlier
      secretOrKey: process.env.JWT_SECRET || 'fallback_secret',
    });
  }

  // 3. This runs if the token is valid.
  // The return value is added to the Request object as `req.user`
  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}