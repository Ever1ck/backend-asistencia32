import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const ActiveUsuario = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user; // Asegúrate de que 'user' esté siendo añadido al objeto de solicitud
  }
);
