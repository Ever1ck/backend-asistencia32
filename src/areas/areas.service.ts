import { Injectable } from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AreasService {

  constructor(private prisma:PrismaService) {}

  create(createAreaDto: CreateAreaDto) {
    return this.prisma.area.create({ data: createAreaDto });
  }

  findAll() {
    return this.prisma.area.findMany();
  }

  findOne(id: number) {
    return this.prisma.area.findUnique({ where: { id } });
  }

  update(id: number, updateAreaDto: UpdateAreaDto) {
    return this.prisma.area.update({ where: { id }, data: updateAreaDto });
  }

  remove(id: number) {
    return this.prisma.area.delete({ where: { id } });
  }
}
