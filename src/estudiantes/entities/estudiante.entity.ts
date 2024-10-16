import { ApiProperty } from "@nestjs/swagger";
import { Estudiante } from "@prisma/client";

export class EstudianteEntity implements Estudiante {

    @ApiProperty()
    id: number;

    @ApiProperty()
    codigo_matricula: string;

    @ApiProperty()
    persona_id: number;

    @ApiProperty()
    gradoAcademico_id: number;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    updated_at: Date;
}
