import { ApiProperty } from "@nestjs/swagger";
import { DiaH, HoraH, TurnoAc, TurnoH } from "@prisma/client";
import { IsEnum, IsInt, IsNotEmpty } from "class-validator";

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

    @ApiProperty( {enum: HoraH} )
    @IsEnum( HoraH )
    @IsNotEmpty()
    horaInicio: HoraH;

    @ApiProperty( {enum: HoraH} )
    @IsEnum( HoraH )
    @IsNotEmpty()
    horaFin: HoraH;

}