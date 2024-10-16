import { Injectable } from '@nestjs/common';
import { CreateAulaDto } from './dto/create-aula.dto';
import { UpdateAulaDto } from './dto/update-aula.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AulasService {

  constructor(private prisma:PrismaService) {}

  create(createAulaDto: CreateAulaDto) {
    return this.prisma.aula.create({
      data: createAulaDto
      });
  }

  findAll() {
    return this.prisma.aula.findMany();
  }

  findOne(id: number) {
    return this.prisma.aula.findUnique({
      where: {id: id}
      });
  }

  update(id: number, updateAulaDto: UpdateAulaDto) {
    return this.prisma.aula.update({
      where: {id: id},
      data: updateAulaDto
      });
  }

  remove(id: number) {
    return this.prisma.aula.delete({
      where: {id: id}
      });
  }
}
