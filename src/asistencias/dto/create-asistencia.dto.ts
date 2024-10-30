import { ApiProperty } from "@nestjs/swagger";
import { EstadoAsis } from "@prisma/client";
import { IsEnum, IsInt, IsNotEmpty } from "class-validator";

export class CreateAsistenciaDto {

    @ApiProperty()
    fecha: Date;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    curso_id: number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    gradoAcademico_id: number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    estudiante_id: number;

    @ApiProperty({ enum: EstadoAsis})
    @IsEnum(EstadoAsis)
    @IsNotEmpty()
    estadoAsistencia: EstadoAsis;

}
