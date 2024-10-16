import { ApiProperty } from "@nestjs/swagger";
import { RolUsuario } from "@prisma/client";
import { Exclude } from "class-transformer";
import { UsuarioEntity } from "src/usuarios/entities/usuario.entity";

export class DocenteEntity implements UsuarioEntity {

    constructor(partial: Partial<DocenteEntity>) {
        Object.assign(this, partial);
      }

    @ApiProperty()
    id: number;

    @ApiProperty()
    email: string;

    @Exclude()
    password: string;

    @ApiProperty({enum: RolUsuario})
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
