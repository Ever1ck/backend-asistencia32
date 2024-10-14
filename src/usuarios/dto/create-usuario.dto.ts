import { ApiProperty } from "@nestjs/swagger";
import { RolUsuario } from "@prisma/client";
import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUsuarioDto {

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    password: string;

    @ApiProperty({enum: RolUsuario, default: RolUsuario.Usuario })
    rol: RolUsuario = RolUsuario.Usuario;

    @ApiProperty({ required: false, default: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png' })
    @IsOptional()
    @IsString()
    avatar?: string;


    @IsOptional()
    estado: boolean = true;

    @ApiProperty()
    @IsNumber()
    Persona_id: number;

}
