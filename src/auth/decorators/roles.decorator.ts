import { SetMetadata } from "@nestjs/common";
import { RolUsuario } from "@prisma/client";

export const ROLES_KEY = 'roles';
export const Roles = (...rol: RolUsuario[]) => SetMetadata(ROLES_KEY, rol); 