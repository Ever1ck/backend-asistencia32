import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, ParseIntPipe } from '@nestjs/common';
import { EntradasService } from './entradas.service';
import { CreateEntradaDto } from './dto/create-entrada.dto';
import { UpdateEntradaDto } from './dto/update-entrada.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags('entradas')
@Controller('entradas')
export class EntradasController {
  constructor(private readonly entradasService: EntradasService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Crea una nueva entrada',
    type: CreateEntradaDto,
  })
  create(@Body() createEntradaDto: CreateEntradaDto, @UploadedFile() file: Express.Multer.File) {
    return this.entradasService.create(createEntradaDto, file);
  }

  @Get()
  findAll() {
    return this.entradasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.entradasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateEntradaDto: UpdateEntradaDto) {
    return this.entradasService.update(id, updateEntradaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.entradasService.remove(id);
  }
}
