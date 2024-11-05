import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEstudiantePersonaDto } from './dto/create-student-persona.dto';

@Injectable()
export class EstudiantesService {

  constructor(private prisma: PrismaService) { }

  create(createEstudianteDto: CreateEstudianteDto) {
    return this.prisma.estudiante.create({
      data: createEstudianteDto
    });
  }

  async createEstudentPersona(createEstudiantePersonaDto: CreateEstudiantePersonaDto) {

    const estudianteExist = await this.prisma.estudiante.findFirst({
      where: {
        codigo_matricula: createEstudiantePersonaDto.codigo_matricula
      }
    });

    if (estudianteExist) {
      throw new BadRequestException('El codigo de matricula ya esta registrado');
    }

    return await this.prisma.$transaction(async (prisma) => {
      const fechaNacimiento = new Date(createEstudiantePersonaDto.fecha_nacimiento);
      const dni = createEstudiantePersonaDto.dni;

      const existingPerson = await prisma.persona.findUnique({
        where: { dni: dni },
      });

      if (existingPerson) {
        throw new Error('El DNI ya está registrado');
      }

      const persona = await prisma.persona.create({
        data: {
          nombres: createEstudiantePersonaDto.nombres,
          apellido_paterno: createEstudiantePersonaDto.apellido_paterno,
          apellido_materno: createEstudiantePersonaDto.apellido_materno,
          telefono: createEstudiantePersonaDto.telefono,
          direccion: createEstudiantePersonaDto.direccion,
          sexo: createEstudiantePersonaDto.sexo,
          fecha_nacimiento: fechaNacimiento,
          dni: dni,
        },
      });

      const estudiante = await prisma.estudiante.create({
        data: {
          codigo_matricula: createEstudiantePersonaDto.codigo_matricula,
          Persona: {
            connect: { id: persona.id },
          },
        },
      });

      return estudiante;
    });
  }

  findAll() {
    return this.prisma.estudiante.findMany({
      include: { Persona: true }
    });
  }

  findOne(id: number) {
    return this.prisma.estudiante.findUnique({
      where: { id: id },
      include: { Persona: true }
    });
  }

  async update(id: number, updateEstudianteDto: UpdateEstudianteDto) {
    const estudianteConPersona = await this.prisma.estudiante.findUnique({
      where: { id: id },
      include: { Persona: true },
    });

    if (!estudianteConPersona) {
      throw new NotFoundException(`Estudiante no encontrado: ${id}`);
    }

    // Filtrar campos undefined para Persona
    const dataToUpdatePersona: any = {};
    if (updateEstudianteDto.nombres !== undefined) dataToUpdatePersona.nombres = updateEstudianteDto.nombres;
    if (updateEstudianteDto.apellido_paterno !== undefined) dataToUpdatePersona.apellido_paterno = updateEstudianteDto.apellido_paterno;
    if (updateEstudianteDto.apellido_materno !== undefined) dataToUpdatePersona.apellido_materno = updateEstudianteDto.apellido_materno;
    if (updateEstudianteDto.direccion !== undefined) dataToUpdatePersona.direccion = updateEstudianteDto.direccion;
    if (updateEstudianteDto.dni !== undefined) dataToUpdatePersona.dni = updateEstudianteDto.dni;
    if (updateEstudianteDto.telefono !== undefined) dataToUpdatePersona.telefono = updateEstudianteDto.telefono;
    if (updateEstudianteDto.fecha_nacimiento !== undefined) {
      const fechaNacimiento = new Date(updateEstudianteDto.fecha_nacimiento);
      if (!isNaN(fechaNacimiento.getTime())) {
        dataToUpdatePersona.fecha_nacimiento = fechaNacimiento;
      } else {
        throw new BadRequestException('Fecha de nacimiento inválida');
      }
    }
    if (updateEstudianteDto.sexo !== undefined) dataToUpdatePersona.sexo = updateEstudianteDto.sexo;

    // Filtrar campos undefined para Estudiante
    const dataToUpdateEstudiante: any = {};
    if (updateEstudianteDto.codigo_matricula !== undefined) dataToUpdateEstudiante.codigo_matricula = updateEstudianteDto.codigo_matricula;

    return await this.prisma.$transaction(async (prisma) => {
      const updatedPersona = await prisma.persona.update({
        where: { id: estudianteConPersona.Persona.id },
        data: dataToUpdatePersona,
      });

      const updatedEstudiante = await prisma.estudiante.update({
        where: { id: id },
        data: dataToUpdateEstudiante,
        include: { Persona: true },
      });

      return updatedEstudiante;
    });
  }

  remove(id: number) {
    return `This action removes a #${id} estudiante`;
  }
}
