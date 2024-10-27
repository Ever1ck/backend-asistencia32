import { ConflictException, Injectable } from '@nestjs/common';
import { CreateModuloDto } from './dto/create-modulo.dto';
import { UpdateModuloDto } from './dto/update-modulo.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ModulosService {

  constructor(private prisma: PrismaService) {}

  async create(createModuloDto: CreateModuloDto) {
    const existingModulo = await this.prisma.modulo.findUnique({ where: { rol: createModuloDto.rol } });
    if (existingModulo) {
      throw new ConflictException('El rol ya ha sido registrado anteriormente');
    }
    return this.prisma.modulo.create({ data: createModuloDto });
  }

  findAll() {
    return this.prisma.modulo.findMany();
  }

  findOne(id: number) {
    return this.prisma.modulo.findUnique({ where: { id } });
  }

  update(id: number, updateModuloDto: UpdateModuloDto) {
    return this.prisma.modulo.update({ where: { id }, data: updateModuloDto });
  }

  remove(id: number) {
    return this.prisma.modulo.delete({ where: { id } });
  }
}
