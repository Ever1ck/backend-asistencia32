import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateEstudiantePersonaDto } from './create-student-persona.dto';

export class UpdateEstudianteDto extends PartialType(CreateEstudiantePersonaDto) {
    @ApiProperty()
    codigo_matricula: string;
}
