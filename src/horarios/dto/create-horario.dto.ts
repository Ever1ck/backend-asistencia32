import { ApiProperty } from "@nestjs/swagger";
import { DiaH, HoraH, TurnoAc, TurnoH } from "@prisma/client";
import { IsArray, IsEnum, IsInt, IsNotEmpty } from "class-validator";

export class CreateHorarioDto {

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    gradoAcademico_id: number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    curso_id: number;


    @ApiProperty({ enum: TurnoH }) 
    @IsEnum( TurnoH )
    @IsNotEmpty()
    turno: TurnoH;

    @ApiProperty( {enum: DiaH} )
    @IsEnum( DiaH )
    @IsNotEmpty()
    dia: DiaH;

    @ApiProperty( {isArray: true, enum:HoraH} )
    @IsArray()
    @IsNotEmpty()
    horas: HoraH[];

}