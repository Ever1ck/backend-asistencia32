import { Module } from '@nestjs/common';
import { GradosacademicosService } from './gradosacademicos.service';
import { GradosacademicosController } from './gradosacademicos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [GradosacademicosController],
  providers: [GradosacademicosService],
})
export class GradosacademicosModule {}
