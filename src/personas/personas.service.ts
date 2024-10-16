import { Injectable } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PersonasService {

  constructor(private prisma:PrismaService) {}

  create(createPersonaDto: CreatePersonaDto) {
    return this.prisma.persona.create({ data: createPersonaDto });
  }

  findAll() {
    return this.prisma.persona.findMany();
  }

  findOne(id: number) {
    return this.prisma.persona.findUnique({
      where: { id },
    });
  }

  update(id: number, updatePersonaDto: UpdatePersonaDto) {
    return `This action updates a #${id} persona`;
  }

  remove(id: number) {
    return `This action removes a #${id} persona`;
  }
}
