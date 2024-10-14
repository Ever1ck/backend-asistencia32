import { Injectable } from '@nestjs/common';
import { CreateEntradaDto } from './dto/create-entrada.dto';
import { UpdateEntradaDto } from './dto/update-entrada.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EntradaEntity } from './entities/entrada.entity';
import * as path from 'path';

@Injectable()
export class EntradasService {

  constructor( private prisma:PrismaService ) {}

  async create(createEntradaDto: CreateEntradaDto, file: Express.Multer.File): Promise<EntradaEntity> {
    const { titulo, contenido, usuario_id, tipo_entrada } = createEntradaDto;
    
    // Obtener la extensión del archivo
    const fileExtension = path.extname(file.originalname);
    
    // Generar un nombre único para la imagen, conservando su extensión
    const uniqueFileName = `${new Date().getTime()}${fileExtension}`;
    
    const portada_url = `/uploads/entradas/${usuario_id}/${uniqueFileName}`;
    const fecha = new Date();

    return this.prisma.entrada.create({
      data: {
        titulo,
        contenido,
        usuario_id,
        tipo_entrada,
        portada_url,
        fecha,
      },
    });
  }

  findAll() {
    return this.prisma.entrada.findMany({ where: { estado_entrada: true }, include: { usuario: true } });
  }

  findOne(id: number) {
    return this.prisma.entrada.findUnique({ where: { id } });
  }

  update(id: number, updateEntradaDto: UpdateEntradaDto) {
    return this.prisma.entrada.update({
      where: { id },
      data: updateEntradaDto,
      });
  }

  remove(id: number) {
    return this.prisma.entrada.update({
      where: { id },
      data: { estado_entrada: false },
      });
  }
}
