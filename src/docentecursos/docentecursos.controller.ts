import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DocentecursosService } from './docentecursos.service';
import { CreateDocentecursoDto } from './dto/create-docentecurso.dto';
import { UpdateDocentecursoDto } from './dto/update-docentecurso.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('docentecursos')
@Controller('docentecursos')
export class DocentecursosController {
  constructor(private readonly docentecursosService: DocentecursosService) {}

  @Post()
  create(@Body() createDocentecursoDto: CreateDocentecursoDto) {
    return this.docentecursosService.create(createDocentecursoDto);
  }

  @Get()
  findAll() {
    return this.docentecursosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.docentecursosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDocentecursoDto: UpdateDocentecursoDto) {
    return this.docentecursosService.update(+id, updateDocentecursoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.docentecursosService.remove(+id);
  }
}
