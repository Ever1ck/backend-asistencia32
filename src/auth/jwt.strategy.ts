import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { jwtConstants } from './constants/jwt.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private usuariosService: UsuariosService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secretjwt,
    });
  }

  async validate(payload: { userId: number }) {
    const user = await this.usuariosService.findOne(payload.userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
} 