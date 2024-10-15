import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PersonasModule } from './personas/personas.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UsuariosModule } from './usuarios/usuarios.module';
import { EntradasModule } from './entradas/entradas.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }), AuthModule, PersonasModule, UsuariosModule, EntradasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}