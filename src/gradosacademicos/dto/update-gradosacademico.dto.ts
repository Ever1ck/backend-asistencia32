import { PartialType } from '@nestjs/swagger';
import { CreateGradosacademicoDto } from './create-gradosacademico.dto';

export class UpdateGradosacademicoDto extends PartialType(CreateGradosacademicoDto) {}
