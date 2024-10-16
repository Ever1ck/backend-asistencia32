import { Module } from '@nestjs/common';
import { DocentescursosService } from './docentescursos.service';
import { DocentescursosController } from './docentescursos.controller';

@Module({
  controllers: [DocentescursosController],
  providers: [DocentescursosService],
})
export class DocentescursosModule {}
