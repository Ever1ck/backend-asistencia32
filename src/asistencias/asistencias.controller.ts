import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AsistenciasService } from './asistencias.service';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RolUsuario } from '@prisma/client';

@Auth(RolUsuario.Docente)
@ApiTags('asistencias')
@Controller('asistencias')
export class AsistenciasController {
  constructor(private readonly asistenciasService: AsistenciasService) { }

  @Post()
  create(@Body() createAsistenciaDto: CreateAsistenciaDto) {
    return this.asistenciasService.create(createAsistenciaDto);
  }

  @Get()
  findAll() {
    return this.asistenciasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.asistenciasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAsistenciaDto: UpdateAsistenciaDto) {
    return this.asistenciasService.update(+id, updateAsistenciaDto);
  }

  @Get('reportegrado/:id')
  async reportePorGradoAcademico(@Param('id') id: string) {
    return this.asistenciasService.reportePorGradoAcademico(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.asistenciasService.remove(+id);
  }

  @Get('reporte/:fecha')
  async obtenerReportePorDia(@Param('fecha') fecha: string) {
    return this.asistenciasService.obtenerReporteAsistenciaPorDia(fecha);
  }

  

}
