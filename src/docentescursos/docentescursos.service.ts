import { Injectable } from '@nestjs/common';
import { CreateDocentescursoDto } from './dto/create-docentescurso.dto';
import { UpdateDocentescursoDto } from './dto/update-docentescurso.dto';

@Injectable()
export class DocentescursosService {
  create(createDocentescursoDto: CreateDocentescursoDto) {
    return 'This action adds a new docentescurso';
  }

  findAll() {
    return `This action returns all docentescursos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} docentescurso`;
  }

  update(id: number, updateDocentescursoDto: UpdateDocentescursoDto) {
    return `This action updates a #${id} docentescurso`;
  }

  remove(id: number) {
    return `This action removes a #${id} docentescurso`;
  }
}
