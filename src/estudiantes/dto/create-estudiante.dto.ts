import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateEstudianteDto {
    @ApiProperty()
    @IsString()
    codigo_matricula: string;

    @ApiProperty()
    @IsInt()
    @Type(() => Number)
    Persona_id: number;

    @ApiProperty()
    @IsInt()
    @Type(() => Number)
    @IsOptional()
    gradoAcademico_id: number;

}
