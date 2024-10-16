import { ApiProperty } from "@nestjs/swagger";
import { RolUsuario } from "@prisma/client";
import { IsEmail } from "class-validator";

export class CreateDocenteDto {

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty({enum: RolUsuario})
    rol: RolUsuario;

    @ApiProperty()
    Persona_id: number;

}
