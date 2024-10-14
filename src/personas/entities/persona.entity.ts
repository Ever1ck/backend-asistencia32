import { ApiProperty } from "@nestjs/swagger";
import { Persona, SexoPersona } from "@prisma/client";

export class PersonaEntiy implements Persona {

    @ApiProperty()
    id: number;

    @ApiProperty()
    dni: string;
    
    @ApiProperty()
    nombres: string;

    @ApiProperty()
    apellido_paterno: string;

    @ApiProperty()
    apellido_materno: string;

    @ApiProperty()
    telefono: string;

    @ApiProperty()
    direccion: string;

    @ApiProperty()
    fecha_nacimiento: Date;

    @ApiProperty({enum: SexoPersona})
    sexo: SexoPersona

    @ApiProperty()
    created_at: Date;
    
    @ApiProperty()
    updated_at: Date;
}
