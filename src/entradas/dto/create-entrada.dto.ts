import { ApiProperty } from "@nestjs/swagger";
import { TipoEntrada } from "@prisma/client";
import { Type } from "class-transformer";
import { IsEnum, IsInt, IsOptional, IsString } from "class-validator";

export class CreateEntradaDto {

    @ApiProperty()
    @IsString()
    titulo: string;

    @ApiProperty( { type: 'string', format: 'binary' })
    file: Express.Multer.File;

    @IsOptional()
    portada_url: string; // Hacer que sea opcional

    @ApiProperty()
    @IsString()
    contenido: string;

    @ApiProperty()
    @IsInt()
    @Type(() => Number)
    usuario_id: number;

    @ApiProperty({enum: TipoEntrada})
    @IsEnum(TipoEntrada)
    tipo_entrada: TipoEntrada;
}
