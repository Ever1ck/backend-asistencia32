import { Injectable } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EstudiantesService {

  constructor(private prisma:PrismaService) {}

  create(createEstudianteDto: CreateEstudianteDto) {
    return this.prisma.estudiante.create({
      data: createEstudianteDto
      });
  }

  findAll() {
    return this.prisma.estudiante.findMany({ 
      include: {Persona: true} 
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} estudiante`;
  }

  update(id: number, updateEstudianteDto: UpdateEstudianteDto) {
    return `This action updates a #${id} estudiante`;
  }

  remove(id: number) {
    return `This action removes a #${id} estudiante`;
  }
}
