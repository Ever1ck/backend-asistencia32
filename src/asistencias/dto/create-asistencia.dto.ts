import { ApiProperty } from "@nestjs/swagger";
import { EstadoAsis } from "@prisma/client";
import { IsDateString, IsEnum, IsInt, IsNotEmpty } from "class-validator";

export class CreateAsistenciaDto {

    @ApiProperty()
    @IsDateString()
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
