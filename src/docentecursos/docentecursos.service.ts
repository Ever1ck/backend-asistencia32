import { Injectable } from '@nestjs/common';
import { CreateDocentecursoDto } from './dto/create-docentecurso.dto';
import { UpdateDocentecursoDto } from './dto/update-docentecurso.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DocentecursosService {

  constructor(private prisma:PrismaService) {}

  create(createDocentecursoDto: CreateDocentecursoDto) {
    return this.prisma.docenteCurso.create({data:createDocentecursoDto});
  }

  findAll() {
    return this.prisma.docenteCurso.findMany({ 
      include: {
        docente: {
          select: {
            id: true,
            rol: true,
            avatar: true,
            Persona_id: true,
            Persona: { // Asumiendo que la relación se llama 'Persona'
              select: {
                // Incluye los campos que necesitas de la tabla Persona
                nombres: true,
                apellido_materno: true,
                apellido_paterno: true,
                // Agrega otros campos necesarios
              }
            }
          }
        },
        curso: true
      }
    });
  }

  findOne(id: number) {
    return this.prisma.docenteCurso.findUnique({where:{id}});
  }

  update(id: number, updateDocentecursoDto: UpdateDocentecursoDto) {
    return this.prisma.docenteCurso.update({
      where:{id},
      data:updateDocentecursoDto
    });
  }

  remove(id: number) {
    return this.prisma.docenteCurso.delete({where:{id}});
  }
}
