import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

export class CreateDocentecursoDto {

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    docente_id: number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    curso_id: number;

}
