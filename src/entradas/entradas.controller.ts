import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { EntradasService } from './entradas.service';
import { CreateEntradaDto } from './dto/create-entrada.dto';
import { UpdateEntradaDto } from './dto/update-entrada.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { promises as fs } from 'fs';

@ApiTags('entradas')
@Controller('entradas')
export class EntradasController {
  constructor(private readonly entradasService: EntradasService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/entradas',
        filename: async (req, file, callback) => {
          // Obtener la lista de archivos existentes
          const dir = './uploads/entradas';
          const files = await fs.readdir(dir);
          const portadaFiles = files.filter(file => file.startsWith('Portada_'));

          // Calcular el siguiente número
          let newIndex = portadaFiles.length + 1; // Incrementar el índice
          const newFileName = `Portada_${newIndex}${extname(file.originalname)}`;
          
          callback(null, newFileName);
        },
      }),
    }),
  )
  async create(@UploadedFile() file: Express.Multer.File, @Body() createEntradaDto: CreateEntradaDto) {
    if (file) {
      createEntradaDto.portada_url = `uploads/entradas/${file.filename}`; // Establecer la URL de la imagen
    }
    return this.entradasService.create(createEntradaDto);
  }

  @Get()
  findAll() {
    return this.entradasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.entradasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateEntradaDto: UpdateEntradaDto) {
    return this.entradasService.update(id, updateEntradaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.entradasService.remove(id);
  }
}
