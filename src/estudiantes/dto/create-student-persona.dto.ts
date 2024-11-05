import { ApiProperty } from '@nestjs/swagger';
import { EstadoEstudiante, SexoPersona } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateEstudiantePersonaDto {

    @IsNotEmpty()
    @ApiProperty()
    codigo_matricula: string;

    @IsOptional()
    @ApiProperty( { required: false } )
    GradoAcademico_id: number;

    @Exclude()
    @IsEnum(EstadoEstudiante)
    EstadoEstudiante: EstadoEstudiante = EstadoEstudiante.Regular;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    @MaxLength(8)
    dni: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    nombres: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    apellido_paterno: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    apellido_materno: string;

    @IsString()
    @ApiProperty()
    telefono: string;

    @IsString()
    @ApiProperty()
    direccion: string;

    @IsString()
    @ApiProperty({ enum: SexoPersona })
    sexo: SexoPersona;

    @IsNotEmpty()
    @ApiProperty()
    fecha_nacimiento: Date;

}