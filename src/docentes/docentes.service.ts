import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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
                id: true,
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

  async docenteinfo(usuario: { email: string; rol: string; }) {
    if (!usuario) {
      throw new BadRequestException('El objeto usuario no puede ser undefined');
    }

    const userWithPersona = await this.prisma.usuario.findUnique({
      where: { email: usuario.email },
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
            curso: {
              select: {
                area: {
                  select: {
                    nombrearea: true
                  }
                }
              }
            }
          }
        },
        Horario: {
          select: {
            dia: true,
            horas: true,
            gradoAcademico: {
              select: {
                id: true,
                grado: true,
                seccion: true,
                turno: true,
                _count: {
                  select: {
                    Estudiante: true
                  }
                }
              }
            },
            curso: {
              select: {
                id: true,
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

    if (!userWithPersona) {
      throw new NotFoundException(`Usuario no encontrado: ${usuario.email}`);
    }
    return {
      id: userWithPersona.id,
      email: userWithPersona.email,
      persona: userWithPersona.Persona,
      docentecurso: userWithPersona.DocenteCurso,
      horario: userWithPersona.Horario
    };
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

  update(id: number, updateDocenteDto: UpdateDocenteDto) {
    return this.prisma.usuario.update({ where: { id }, data: updateDocenteDto });
  }

  remove(id: number) {
    return this.prisma.usuario.delete({ where: { id } });
  }

}

