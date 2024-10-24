import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGradosacademicoDto } from './dto/create-gradosacademico.dto';
import { UpdateGradosacademicoDto } from './dto/update-gradosacademico.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GradosacademicosService {

  constructor(private prisma: PrismaService) { }

  async create(createGradosacademicoDto: CreateGradosacademicoDto) {

    const aulaExistente = await this.prisma.aula.findUnique({
      where: { id: createGradosacademicoDto.aula_id },
    });

    if (!aulaExistente) {
      throw new NotFoundException('El aula especificada no existe');
    }

    const tutorExistente = await this.prisma.usuario.findUnique({
      where: { id: createGradosacademicoDto.tutor_id },
    });

    if (!tutorExistente) {
      throw new NotFoundException('El docente no existe');
    }


    // Verificar si ya existe un grado académico con el mismo aula_id y turno
    const aulaTurnoExistente = await this.prisma.gradoAcademico.findFirst({
      where: {
        aula_id: createGradosacademicoDto.aula_id,
        turno: createGradosacademicoDto.turno
      },
    });

    if (aulaTurnoExistente) {
      throw new ConflictException('Ya existe un grado académico en esta aula con el mismo turno');
    }

    // Verificar si ya existe un grado académico con el mismo grado y seccion
    const gradoSeccionExistente = await this.prisma.gradoAcademico.findFirst({
      where: {
        grado: createGradosacademicoDto.grado,
        seccion: createGradosacademicoDto.seccion
      },
    });

    if (gradoSeccionExistente) {
      throw new ConflictException('Ya existe un grado académico con el mismo grado y sección');
    }

    // Si pasa ambas verificaciones, crear el nuevo grado académico
    return this.prisma.gradoAcademico.create({ data: createGradosacademicoDto });
  }

  findAll() {
    return this.prisma.gradoAcademico.findMany({
      include: {
        tutor: {
          select: {
            Persona: {
              select: {
                nombres: true,
                apellido_paterno: true,
                apellido_materno: true,
              },
            },
          },
        },
        aula: {
          select: {
            edificio: true,
            piso: true,
            numeroAula: true,
          },
        },
        Horario: {
          select: {
            id: true,
            gradoAcademico_id: true,
            curso: {
              select: {
                id: true,
                area: true,
              }
            },
            turno: true,
            dia: true,
            horaInicio: true,
            horaFin: true,
          }
        }
      },
    });
  }

  findOne(id: number) {
    return this.prisma.gradoAcademico.findUnique({ 
      where: { id: id },
      include: {
        tutor: {
          select: {
            Persona: {
              select: {
                nombres: true,
                apellido_paterno: true,
                apellido_materno: true,
              },
            },
          },
        },
        aula: {
          select: {
            edificio: true,
            piso: true,
            numeroAula: true,
          },
        },
        Estudiante: {
          select: {
            id: true,
            Persona: {
              select: {
                nombres: true,
                apellido_paterno: true,
                apellido_materno: true,
              },
            },
          },
        },
        Horario: {
          select: {
            id: true,
            gradoAcademico_id: true,
            curso: {
              select: {
                id: true,
                area: true,
              }
            },
            turno: true,
            dia: true,
            horaInicio: true,
            horaFin: true,
          }
        }
      },
    });
  }

  update(id: number, updateGradosacademicoDto: UpdateGradosacademicoDto) {
    return this.prisma.gradoAcademico.update({ 
      where: { id: id }, 
      data: updateGradosacademicoDto 
    });
  }

  remove(id: number) {
    return this.prisma.gradoAcademico.delete({ 
      where: { id: id } 
    });
  }
}
