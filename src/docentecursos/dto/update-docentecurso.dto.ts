import { PartialType } from '@nestjs/swagger';
import { CreateDocentecursoDto } from './create-docentecurso.dto';

export class UpdateDocentecursoDto extends PartialType(CreateDocentecursoDto) {}
