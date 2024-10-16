import { Injectable } from '@nestjs/common';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RolUsuario } from '@prisma/client';

@Injectable()
export class DocentesService {

  constructor(private prisma:PrismaService) {}

  create(createDocenteDto: CreateDocenteDto) {
    return this.prisma.usuario.create({ data: createDocenteDto });
  }

  findAll() {
    return this.prisma.usuario.findMany( { where: { rol: 'Docente' }, include: { Persona: true } });
  }

  findOne(id: number) {
    return this.prisma.usuario.findUnique({ where: { id }, include: { Persona: true } });
  }

  update(id: number, updateDocenteDto: UpdateDocenteDto) {
    return this.prisma.usuario.update({ where: { id }, data: updateDocenteDto });
  }

  remove(id: number) {
    return this.prisma.usuario.delete({ where: { id } });
  }
}
