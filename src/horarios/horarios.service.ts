import { Injectable } from '@nestjs/common';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HorariosService {

  constructor(private prisma: PrismaService) { }

  create(createHorarioDto: CreateHorarioDto) {
    return this.prisma.horario.create({ data: createHorarioDto });
  }

  findAll() {
    return this.prisma.horario.findMany({
      include: {
        gradoAcademico: {
          select: {
            id: true,
            grado: true,
            seccion: true,
          }
        },
        curso: {
          select: {
            id: true,
            area: true,
          }
        },
        docente: {
          select: {
            Persona: {
              select: {
                nombres: true,
                apellido_paterno: true,
                apellido_materno: true,
              }
            }
          }
        }
      }
    });
  }

  findOne(id: number) {
    return this.prisma.horario.findUnique({ 
      where: { id },
      include: {
        gradoAcademico: {
          select: {
            id: true,
            grado: true,
            seccion: true,
          }
        },
        curso: {
          select: {
            id: true,
            area: true,
          }
        }
      }
    });
  }

  update(id: number, updateHorarioDto: UpdateHorarioDto) {
    return this.prisma.horario.update({
      where: { id },
      data: updateHorarioDto
    });
  }

  remove(id: number) {
    return this.prisma.horario.delete({ where: { id } });
  }
}
