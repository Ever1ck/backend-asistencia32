import { Module } from '@nestjs/common';
import { EntradasService } from './entradas.service';
import { EntradasController } from './entradas.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

@Module({
  imports: [
    PrismaModule,
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/entradas',
        filename: (req, file, callback) => {
          const fileExt = path.extname(file.originalname); // Obtener la extensión del archivo
          const fileName = `${path.basename(file.originalname, fileExt)}_${Date.now()}${fileExt}`; // Usar el nombre original y añadir timestamp
          callback(null, fileName);
        },
      }),
    }),
  ],
  controllers: [EntradasController],
  providers: [EntradasService],
})
export class EntradasModule {}
