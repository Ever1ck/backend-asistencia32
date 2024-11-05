import { ApiProperty } from "@nestjs/swagger";
import { EstadoEstudiante, Estudiante } from "@prisma/client";

export class EstudianteEntity implements Estudiante {

    @ApiProperty()
    id: number;

    @ApiProperty()
    codigo_matricula: string;

    @ApiProperty()
    Persona_id: number;

    @ApiProperty()
    GradoAcademico_id: number;

    @ApiProperty()
    EstadoEstudiante: EstadoEstudiante;

    @ApiProperty()
    Estado: boolean;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    updated_at: Date;
}
