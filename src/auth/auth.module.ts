import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './constants/jwt.constants';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secretjwt,
      signOptions: { expiresIn: '1d' }, // e.g. 30s, 7d, 24h
    }),
    UsuariosModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
