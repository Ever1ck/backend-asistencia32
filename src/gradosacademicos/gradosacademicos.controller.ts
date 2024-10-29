import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GradosacademicosService } from './gradosacademicos.service';
import { CreateGradosacademicoDto } from './dto/create-gradosacademico.dto';
import { UpdateGradosacademicoDto } from './dto/update-gradosacademico.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RolUsuario } from '@prisma/client';

@ApiTags('gradosacademicos')
@Controller('gradosacademicos')
@Auth(RolUsuario.Docente)
export class GradosacademicosController {
  constructor(private readonly gradosacademicosService: GradosacademicosService) {}

  @Post()
  create(@Body() createGradosacademicoDto: CreateGradosacademicoDto) {
    return this.gradosacademicosService.create(createGradosacademicoDto);
  }

  @Get()
  findAll() {
    return this.gradosacademicosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gradosacademicosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGradosacademicoDto: UpdateGradosacademicoDto) {
    return this.gradosacademicosService.update(+id, updateGradosacademicoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gradosacademicosService.remove(+id);
  }
}
