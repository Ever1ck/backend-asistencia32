import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { DocentesService } from './docentes.service';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { DocenteEntity } from './entities/docente.entity';

@ApiTags('docentes')
@Controller('docentes')
export class DocentesController {
  constructor(private readonly docentesService: DocentesService) {}

  @Post()
  @ApiCreatedResponse({ type: DocenteEntity })
  async create(@Body() createDocenteDto: CreateDocenteDto) {
    return new DocenteEntity(await this.docentesService.create(createDocenteDto));
  }

  @Get()
  @ApiCreatedResponse({ type: DocenteEntity, isArray: true })
  async findAll() {
    const docente = await this.docentesService.findAll()
    return docente.map(docente => new DocenteEntity(docente));
  }

  @Get(':id')
  @ApiCreatedResponse({ type: DocenteEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return new DocenteEntity(await this.docentesService.findOne(id));
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: DocenteEntity })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateDocenteDto: UpdateDocenteDto) {
    return new DocenteEntity(await this.docentesService.update(id, updateDocenteDto));
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: DocenteEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new DocenteEntity(await this.docentesService.remove(id));
  }
}
