import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { EntradasService } from './entradas.service';
import { CreateEntradaDto } from './dto/create-entrada.dto';
import { UpdateEntradaDto } from './dto/update-entrada.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { promises as fs } from 'fs';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RolUsuario } from '@prisma/client';

@ApiTags('entradas')
@Controller('entradas')
export class EntradasController {
  constructor(private readonly entradasService: EntradasService) {}

  @Auth(RolUsuario.Usuario)
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

  @Get('eventos')
  findEvents() {
    return this.entradasService.findEvents();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.entradasService.findOne(id);
  }

  @Auth(RolUsuario.Usuario)
  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/entradas',
        filename: async (req, file, callback) => {
          const dir = './uploads/entradas';
          const files = await fs.readdir(dir);
          const portadaFiles = files.filter(file => file.startsWith('Portada_'));
          let newIndex = portadaFiles.length + 1;
          const newFileName = `Portada_${newIndex}${extname(file.originalname)}`;
          callback(null, newFileName);
        },
      }),
    }),
  )
  async update(@Param('id', ParseIntPipe) id: number, @UploadedFile() file: Express.Multer.File, @Body() updateEntradaDto: UpdateEntradaDto) {
    if (file) {
      updateEntradaDto.portada_url = `uploads/entradas/${file.filename}`;
    }
    return this.entradasService.update(id, updateEntradaDto);
  }

  @Auth(RolUsuario.Usuario)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.entradasService.remove(id);
  }
}
