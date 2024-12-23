import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthEntity } from './entities/auth.entity';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { UpdateProfileDto } from './dto/update.dto';

export const roundsOfHashing = 10;

@Injectable()
export class AuthService {

  constructor(private prisma: PrismaService, private jwtService: JwtService) { }

  async login(email: string, password: string): Promise<AuthEntity> {
    // Step 1: Fetch a user with the given email
    const user = await this.prisma.usuario.findUnique({ where: { email: email } });

    // If no user is found, throw an error
    if (!user) {
      throw new NotFoundException(`Correo electronico invalido`);
    }

    // Step 2: Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If password does not match, throw an error
    if (!isPasswordValid) {
      throw new UnauthorizedException('Contraseña Invalida');
    }

    const payload = { usuarioId: user.id, rol: user.rol };
    // Step 3: Generate a JWT containing the user's ID and return it

    const token = this.jwtService.sign(payload);

    return {
      email: user.email,
      accessToken: this.jwtService.sign(payload),
    };
  }


  async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, roundsOfHashing);
    registerDto.password = hashedPassword;

    const userexist = await this.prisma.usuario.findFirst({
      where: {
        email: registerDto.email
      }
    });

    if (userexist) {
      throw new BadRequestException('Correo Electronico ya registrado');
    }

    return await this.prisma.$transaction(async (prisma) => {
      // Convertir la fecha de nacimiento a un objeto Date
      const fechaNacimiento = new Date(registerDto.fecha_nacimiento);

      // Obtener el DNI del registerDto
      const dni = registerDto.dni;

      // Buscar en la base de datos si ya existe una persona con ese DNI
      const existingPerson = await prisma.persona.findUnique({
        where: { dni: dni },
      });

      // Si existe, lanzar un error indicando que el DNI ya está registrado
      if (existingPerson) {
        throw new Error('El DNI ya está registrado');
      }

      // Si no existe, proceder con la creación de la persona y el usuario
      const persona = await prisma.persona.create({
        data: {
          nombres: registerDto.nombres,
          apellido_paterno: registerDto.apellido_paterno,
          apellido_materno: registerDto.apellido_materno,
          telefono: registerDto.telefono,
          direccion: registerDto.direccion,
          sexo: registerDto.sexo,
          fecha_nacimiento: fechaNacimiento,
          dni: dni, // Asegúrate de incluir el DNI en la creación de la persona
        },
      });

      // Crear el usuario con el ID de la persona
      const user = await prisma.usuario.create({
        data: {
          email: registerDto.email,
          password: registerDto.password,
          rol: registerDto.rol,
          Persona_id: persona.id,
        },
      });

      const payload = { usuarioId: user.id, rol: user.rol };
      const token = this.jwtService.sign(payload);

      return {
        user,
        token,
      };
    });
  }

  async profile(usuario: { email: string; rol: string; }) {
    if (!usuario) {
      throw new BadRequestException('El objeto usuario no puede ser undefined');
    }

    const userWithPersona = await this.prisma.usuario.findUnique({
      where: { email: usuario.email },
      include: { Persona: true },
    });

    if (!userWithPersona) {
      throw new NotFoundException(`Usuario no encontrado: ${usuario.email}`);
    }

    return {
      id: userWithPersona.id,
      email: userWithPersona.email,
      rol: userWithPersona.rol,
      avatar: userWithPersona.avatar,
      persona: userWithPersona.Persona,
    };
  }

  async updateProfile(user: { email: string; rol: string; }, updateProfileDto: UpdateProfileDto) {
    const userWithPersona = await this.prisma.usuario.findUnique({
      where: { email: user.email },
      include: { Persona: true },
    });

    if (!userWithPersona) {
      throw new NotFoundException(`Usuario no encontrado: ${user.email}`);
    }

    // Filtrar campos undefined
    const dataToUpdate: any = {};
    if (updateProfileDto.nombres !== undefined) dataToUpdate.nombres = updateProfileDto.nombres;
    if (updateProfileDto.apellido_paterno !== undefined) dataToUpdate.apellido_paterno = updateProfileDto.apellido_paterno;
    if (updateProfileDto.apellido_materno !== undefined) dataToUpdate.apellido_materno = updateProfileDto.apellido_materno;
    if (updateProfileDto.direccion !== undefined) dataToUpdate.direccion = updateProfileDto.direccion;
    if (updateProfileDto.dni !== undefined) dataToUpdate.dni = updateProfileDto.dni;
    if (updateProfileDto.telefono !== undefined) dataToUpdate.telefono = updateProfileDto.telefono;
    if (updateProfileDto.fecha_nacimiento !== undefined) {
      const fechaNacimiento = new Date(updateProfileDto.fecha_nacimiento);
      if (!isNaN(fechaNacimiento.getTime())) {
        dataToUpdate.fecha_nacimiento = fechaNacimiento;
      } else {
        throw new BadRequestException('Fecha de nacimiento inválida');
      }
    }

    // Filtrar campos undefined para Usuario
    const userDataToUpdate: any = {};
    if (updateProfileDto.email !== undefined) userDataToUpdate.email = updateProfileDto.email;
    if (updateProfileDto.avatar !== undefined) userDataToUpdate.avatar = updateProfileDto.avatar;

    return await this.prisma.$transaction(async (prisma) => {
      const updatedPersona = await prisma.persona.update({
        where: { id: userWithPersona.Persona.id },
        data: dataToUpdate,
      });

      const updatedUser = await prisma.usuario.update({
        where: { email: user.email },
        data: userDataToUpdate,
      });

      return {
        email: updatedUser.email,
        rol: updatedUser.rol,
        avatar: updatedUser.avatar,
        persona: updatedPersona,
      };
    });
  }

}
