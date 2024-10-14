import { Module } from '@nestjs/common';
import { EntradasService } from './entradas.service';
import { EntradasController } from './entradas.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads/entradas',
    }),
    PrismaModule
  ],
  controllers: [EntradasController],
  providers: [EntradasService],
})
export class EntradasModule {}
