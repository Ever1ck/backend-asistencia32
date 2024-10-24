import { Module } from '@nestjs/common';
import { CursosService } from './cursos.service';
import { CursosController } from './cursos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CursosController],
  providers: [CursosService],
})
export class CursosModule {}
