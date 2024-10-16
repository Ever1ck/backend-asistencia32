import { PartialType } from '@nestjs/swagger';
import { CreateDocentescursoDto } from './create-docentescurso.dto';

export class UpdateDocentescursoDto extends PartialType(CreateDocentescursoDto) {}
