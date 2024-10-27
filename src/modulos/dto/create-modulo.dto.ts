import { ApiProperty } from "@nestjs/swagger";
import { RolUsuario } from "@prisma/client";
import { IsArray, IsEnum, IsString } from "class-validator";

export class CreateModuloDto {

    @ApiProperty()
    @IsEnum(RolUsuario)
    rol: RolUsuario;

    @ApiProperty({ type: [String] })
    @IsArray()
    modulos: string[];

}
