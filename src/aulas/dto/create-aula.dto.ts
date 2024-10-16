import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateAulaDto {

    @ApiProperty()
    @IsNumber()
    edificio: number;

    @ApiProperty()
    @IsNumber()
    piso: number;

    @ApiProperty()
    @IsNumber()
    numeroAula: number;
}
