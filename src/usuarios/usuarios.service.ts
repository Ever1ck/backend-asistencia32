import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

export const roundsOfHashing = 10;

@Injectable()
export class UsuariosService {

  constructor(private prisma:PrismaService) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const hashedPassword = await bcrypt.hash(
      createUsuarioDto.password,
      roundsOfHashing,
    );
    createUsuarioDto.password = hashedPassword;

    const emailexist = await this.prisma.usuario.findFirst({
      where: {
        email: createUsuarioDto.email,
      },
    });

    if (emailexist) {
      throw new BadRequestException('El email ya ha sido registrado');
    }

    const personaexist = await this.prisma.usuario.findFirst({
      where: {
        Persona_id: createUsuarioDto.Persona_id,
      },
    });

    if (personaexist) {
      throw new BadRequestException('La persona ya ha sido registrada en otro usuario');
    }

    if (createUsuarioDto.Persona_id) {
      const personaexiste = await this.prisma.persona.findFirst({
        where: { id: createUsuarioDto.Persona_id },
      });

      if (!personaexiste) {
        throw new NotFoundException('La persona no existe');
      }
    }

    return this.prisma.usuario.create({ data: createUsuarioDto });

  }

  findAll() {
    return this.prisma.usuario.findMany();
  }

  findOne(id: number) {
    return this.prisma.usuario.findUnique({ 
      where: { id }, 
      include: { Persona: true } 
    });
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return this.prisma.usuario.update({
      where: { id },
      data: updateUsuarioDto,
      });
  }

  remove(id: number) {
    return this.prisma.usuario.delete({ where: { id } });
  }
}
