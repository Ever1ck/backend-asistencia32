import { Injectable } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CursosService {

  constructor(private prisma: PrismaService) { }

  create(createCursoDto: CreateCursoDto) {
    return this.prisma.curso.create({ data: createCursoDto });
  }

  findAll() {
    return this.prisma.curso.findMany({
      include: {
        DocenteCurso: {
          include: {
            docente:
            {select: {
                id: true,
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
        }
      }
    });
  }

  findOne(id: number) {
    return this.prisma.curso.findUnique({
      where: { id },
      include: {
        DocenteCurso: {
          include: {
            docente:
            {select: {
                id: true,
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
        }
      }
    });
  }

  update(id: number, updateCursoDto: UpdateCursoDto) {
    return this.prisma.curso.update({ where: { id }, data: updateCursoDto });
  }

  remove(id: number) {
    return this.prisma.curso.delete({ where: { id } });
  }
}
