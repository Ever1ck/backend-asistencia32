import { ApiProperty } from "@nestjs/swagger";
import { SexoPersona } from "@prisma/client";
import { IsDate, IsDateString, IsEnum, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreatePersonaDto {

    @ApiProperty()
    @IsString()
    @MaxLength(8)
    @IsNotEmpty()
    dni: string;

    @ApiProperty()
    @IsString()
    nombres: string;

    @ApiProperty()
    @IsString()
    apellido_paterno: string;

    @ApiProperty()
    @IsString()
    apellido_materno: string;

    @ApiProperty()
    @IsString()
    telefono: string;

    @ApiProperty()
    @IsString()
    direccion: string;

    @ApiProperty()
    @IsDateString()
    fecha_nacimiento: Date;

    @ApiProperty( {enum: SexoPersona} )
    @IsEnum(SexoPersona)
    sexo: SexoPersona;
}
