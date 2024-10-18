import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEntradaDto } from './dto/create-entrada.dto';
import { UpdateEntradaDto } from './dto/update-entrada.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EntradasService {

  constructor( private prisma:PrismaService ) {}

  create(createEntradaDto: CreateEntradaDto) {
    return this.prisma.entrada.create({ data: createEntradaDto });
  }

  findAll() {
    return this.prisma.entrada.findMany({
      where: { estado_entrada: true },
      include: {
        usuario: {
          select: {
            rol: true
          }
        }
      }
    });
  }

  findEvents() {
    return this.prisma.entrada.findMany({
      where: { estado_entrada: true, tipo_entrada: 'Evento' },
      include: {
        usuario: {
          select: {
            rol: true
          }
        }
      }
    });
  }

  findOne(id: number) {
    return this.prisma.entrada.findUnique({ where: { id }, include: { usuario: true } });
  }

  async update(id: number, updateEntradaDto: UpdateEntradaDto) {
    // Verificar si el usuario_id existe
    if (updateEntradaDto.usuario_id) {
      const usuario = await this.prisma.usuario.findUnique({
        where: { id: updateEntradaDto.usuario_id },
      });
      if (!usuario) {
        throw new NotFoundException(`Usuario con id ${updateEntradaDto.usuario_id} no encontrado`);
      }
    }

    return this.prisma.entrada.update({
      where: { id },
      data: updateEntradaDto,
    });
  }

  remove(id: number) {
    return this.prisma.entrada.update({ where: { id }, data: { estado_entrada: false } });
  }
}
