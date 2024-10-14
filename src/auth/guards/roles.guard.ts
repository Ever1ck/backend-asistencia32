import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { RolUsuario } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private readonly reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RolUsuario[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    // Verificar si el rol del usuario es ADMIN
    if (user.rol === 'Administrador') {
      return true;
    }

    return requiredRoles.some((rol) => user.rol?.includes(rol));
  }
}
