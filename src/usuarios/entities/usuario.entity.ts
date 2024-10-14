import { ApiProperty } from "@nestjs/swagger";
import { RolUsuario, Usuario } from "@prisma/client";

export class UsuarioEntity implements Usuario {
    @ApiProperty()
    id: number;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty({enum: RolUsuario, default: RolUsuario.Usuario })
    rol: RolUsuario;

    @ApiProperty()
    avatar: string;

    @ApiProperty()
    estado: boolean;

    @ApiProperty()
    Persona_id: number;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    updated_at: Date;
}
