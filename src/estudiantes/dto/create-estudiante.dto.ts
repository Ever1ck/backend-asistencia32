import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsString } from "class-validator";

export class CreateEstudianteDto {
    @ApiProperty()
    @IsString()
    codigo_matricula: string;

    @ApiProperty()
    @IsInt()
    @Type(() => Number)
    persona_id: number;

    @ApiProperty()
    @IsInt()
    @Type(() => Number)
    gradoAcademico_id: number;

}
