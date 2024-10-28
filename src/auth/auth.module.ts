import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './constants/jwt.constants';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secretjwt,
      signOptions: { expiresIn: '1d' }, // e.g. 30s, 7d, 24h
    }),
    UsuariosModule,
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/profiles',
        filename: (req, file, callback) => {
          const fileExt = path.extname(file.originalname); // Obtener la extensión del archivo
          const fileName = `${path.basename(file.originalname, fileExt)}_${Date.now()}${fileExt}`; // Usar el nombre original y añadir timestamp
          callback(null, fileName);
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
