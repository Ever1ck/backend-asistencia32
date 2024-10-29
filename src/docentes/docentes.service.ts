import { Injectable } from '@nestjs/common';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RolUsuario } from '@prisma/client';

@Injectable()
export class DocentesService {

  constructor(private prisma: PrismaService) { }

  create(createDocenteDto: CreateDocenteDto) {
    return this.prisma.usuario.create({ data: createDocenteDto });
  }

  findAll() {
    return this.prisma.usuario.findMany({
      where: { rol: 'Docente' },
      include: {
        Persona: {
          select: {
            nombres: true,
            apellido_paterno: true,
            apellido_materno: true,
          },
        },
        DocenteCurso: {
          include: {
            curso: {
              include: {
                area: {
                  select: {
                    nombrearea: true
                  }
                },
              },
            }
          }
        },
        Horario: {
          select: {
            dia: true,
            horas: true,
            gradoAcademico: {
              select: {
                grado: true,
                seccion: true,
                turno: true,
              }
            },
            curso: {
              select: {
                area: {
                  select: {
                    nombrearea: true
                  }
                }
              }
            }
          },
        }
      }
    });
  }

  findOne(id: number) {
    return this.prisma.usuario.findUnique({
      where: { id },
      include: {
        Persona: {
          select: {
            nombres: true,
            apellido_paterno: true,
            apellido_materno: true,
            fecha_nacimiento: true,
          },
        },
        DocenteCurso: {
          include: {
            curso: true
          }
        }
      }
    });
  }

  update(id: number, updateDocenteDto: UpdateDocenteDto) {
    return this.prisma.usuario.update({ where: { id }, data: updateDocenteDto });
  }

  remove(id: number) {
    return this.prisma.usuario.delete({ where: { id } });
  }
}
