import { Module } from '@nestjs/common';
import { DocentecursosService } from './docentecursos.service';
import { DocentecursosController } from './docentecursos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DocentecursosController],
  providers: [DocentecursosService],
})
export class DocentecursosModule {}
