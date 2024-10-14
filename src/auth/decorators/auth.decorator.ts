import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { RolUsuario } from "@prisma/client";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { RolesGuard } from "../guards/roles.guard";
import { ApiBearerAuth, ApiUnauthorizedResponse } from "@nestjs/swagger";

export function Auth(...rol:RolUsuario[]) {
    return applyDecorators(
        SetMetadata('roles', rol),
        UseGuards(JwtAuthGuard, RolesGuard),
        ApiBearerAuth(),
        ApiUnauthorizedResponse({description:'No autorizado'}) 
    )

}