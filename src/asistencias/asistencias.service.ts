import { Injectable } from '@nestjs/common';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AsistenciasService {

  constructor(private prisma: PrismaService) { }

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

  //Reporte
  async obtenerReporteAsistenciaPorDia(fecha: string) {
    const asistencias = await this.prisma.asistencia.findMany({
      where: {
        fecha: {
          gte: new Date(`${fecha}T00:00:00Z`), // Comienzo del día
          lt: new Date(`${fecha}T23:59:59Z`), // Fin del día
        },
      },
      include: {
        estudiante: {
          include: {
            Persona: true, // Incluye información de la persona si es necesario
          },
        },
        curso: {
          select: {
            id: true,
            area: {
              select: {
                nombrearea: true,
              }, // Ajusta según tus necesidades
            }
          }
        }, // Incluye el curso si es necesario
      },
    });

    return asistencias.map((asistencia) => ({
      id: asistencia.id,
      fecha: asistencia.fecha,
      estadoAsistencia: asistencia.estadoAsistencia,
      estudiante_id: asistencia.estudiante.id,
      estudiante_nombre: `${asistencia.estudiante.Persona.nombres} ${asistencia.estudiante.Persona.apellido_paterno} ${asistencia.estudiante.Persona.apellido_materno}`,
      curso_id: asistencia.curso.id,
      curso_area: asistencia.curso.area.nombrearea, // Ajusta según tus necesidades
    }));
  }

  async reportePorGradoAcademico(id: number) {
    const asistencias = await this.prisma.asistencia.findMany({
      where: {
        gradoAcademico_id: id
      },
      include: {
        estudiante: {
          include: {
            Persona: true, // Incluye información de la persona si es necesario
          },
        },
        curso: {
          select: {
            id: true,
            area: {
              select: {
                nombrearea: true,
              }, // Ajusta según tus necesidades
            }
          }
        }, // Incluye el curso si es necesario
      },
    });
    return asistencias.map((asistencia) => ({
      id: asistencia.id,
      fecha: asistencia.fecha,
      curso_id: asistencia.curso.id,
      gradoAcademico_id: asistencia.gradoAcademico_id,
      estudiante_id: asistencia.estudiante.id,
      estadoAsistencia: asistencia.estadoAsistencia,
      estudiante_nombre: `${asistencia.estudiante.Persona.nombres} ${asistencia.estudiante.Persona.apellido_paterno} ${asistencia.estudiante.Persona.apellido_materno}`,
      
      curso_area: asistencia.curso.area.nombrearea, // Ajusta según tus necesidades
    }));
  }

}
