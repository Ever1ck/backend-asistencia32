import { Injectable } from '@nestjs/common';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AsistenciasService {

  constructor(private prisma:PrismaService) { }

  create(createAsistenciaDto: CreateAsistenciaDto) {
    return this.prisma.asistencia.create({ data: createAsistenciaDto });
  }

  findAll() {
    return this.prisma.asistencia.findMany();
  }

  findOne(id: number) {
    return this.prisma.asistencia.findUnique({ where: { id } });
  }

  update(id: number, updateAsistenciaDto: UpdateAsistenciaDto) {
    return this.prisma.asistencia.update({ where: { id }, data: updateAsistenciaDto });
  }

  remove(id: number) {
    return this.prisma.asistencia.delete({ where: { id } });
  }
}
