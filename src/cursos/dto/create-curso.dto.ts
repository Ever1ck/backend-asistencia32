import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateCursoDto {

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    areaid: number;
    

}
