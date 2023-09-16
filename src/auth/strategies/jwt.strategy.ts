import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  logger: Logger;
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly UserService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'JWT_SECRET',
    });
    this.logger = new Logger(JwtStrategy.name);
  }

  async validate(payload: any) {
    this.logger.log('Validate passport:', payload);
    return await this.UserService.findOne({ _id: payload._id });
  }
}
