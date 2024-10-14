import { ApiProperty } from "@nestjs/swagger";
import { Entrada, TipoEntrada } from "@prisma/client";

export class EntradaEntity implements Entrada{
    
    @ApiProperty()
    id: number;

    @ApiProperty()
    titulo: string;

    @ApiProperty()
    contenido: string;

    @ApiProperty()
    portada_url: string;

    @ApiProperty()
    usuario_id: number;

    @ApiProperty({enum: TipoEntrada})
    tipo_entrada: TipoEntrada;

    @ApiProperty()
    fecha: Date;

    @ApiProperty()
    estado_entrada: boolean;

    @ApiProperty()
    created_at: Date;
    
    @ApiProperty()
    updated_at: Date;

}
