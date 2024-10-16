import { ApiProperty } from "@nestjs/swagger";
import { GradoAc, TurnoAc } from "@prisma/client";
import { Type } from "class-transformer";
import { IsEnum, IsInt, IsString } from "class-validator";

export class CreateGradosacademicoDto {

    @ApiProperty({enum: GradoAc})
    @IsEnum(GradoAc)
    grado: GradoAc

    @ApiProperty()
    @IsString()
    seccion: string;

    @ApiProperty()
    @IsInt()
    @Type(() => Number)
    tutor_id: number;

    @ApiProperty()
    @IsInt()
    @Type(() => Number)
    aula_id: number;

    @ApiProperty({enum: TurnoAc})
    @IsEnum(TurnoAc)
    turno: TurnoAc
}
