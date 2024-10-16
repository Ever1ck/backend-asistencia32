import { Injectable } from '@nestjs/common';
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

  update(id: number, updateEntradaDto: UpdateEntradaDto) {
    return this.prisma.entrada.update({ where: { id }, data: updateEntradaDto });
  }

  remove(id: number) {
    return this.prisma.entrada.update({ where: { id }, data: { estado_entrada: false } });
  }
}
