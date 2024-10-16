import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PersonasModule } from './personas/personas.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UsuariosModule } from './usuarios/usuarios.module';
import { EntradasModule } from './entradas/entradas.module';
import { EstudiantesModule } from './estudiantes/estudiantes.module';
import { AulasModule } from './aulas/aulas.module';
import { GradosacademicosModule } from './gradosacademicos/gradosacademicos.module';
import { DocentesModule } from './docentes/docentes.module';
import { Docentescurso } from './docentescursos/entities/docentescurso.entity';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '/uploads'),
      serveRoot: '/uploads',
    }),
    AuthModule, PersonasModule, UsuariosModule, EntradasModule, EstudiantesModule, AulasModule, GradosacademicosModule, DocentesModule, Docentescurso],
  controllers: [],
  providers: [],
})
export class AppModule { }