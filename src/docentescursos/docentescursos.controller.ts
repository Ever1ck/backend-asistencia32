import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DocentescursosService } from './docentescursos.service';
import { CreateDocentescursoDto } from './dto/create-docentescurso.dto';
import { UpdateDocentescursoDto } from './dto/update-docentescurso.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('docentescursos')
@Controller('docentescursos')
export class DocentescursosController {
  constructor(private readonly docentescursosService: DocentescursosService) {}

  @Post()
  create(@Body() createDocentescursoDto: CreateDocentescursoDto) {
    return this.docentescursosService.create(createDocentescursoDto);
  }

  @Get()
  findAll() {
    return this.docentescursosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.docentescursosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDocentescursoDto: UpdateDocentescursoDto) {
    return this.docentescursosService.update(+id, updateDocentescursoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.docentescursosService.remove(+id);
  }
}
