import { ApiProperty } from '@nestjs/swagger';
import { RolUsuario, SexoPersona } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  password: string;

  @Exclude()
  @IsEnum(RolUsuario)
  rol: RolUsuario = RolUsuario.Usuario

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