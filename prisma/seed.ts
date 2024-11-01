import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const roundsOfHashing = 10;

async function main() {

  const passwordadmin = await bcrypt.hash('tkm.forever', roundsOfHashing);

  const persona1 = await prisma.persona.create({
    data: {
      dni: '72496995',
      nombres: 'Brandon Everick',
      apellido_paterno: 'Puma',
      apellido_materno: 'Mestas',
      telefono: '970697466',
      direccion: 'Av. El Maestro 566',
      sexo: 'Masculino',
      fecha_nacimiento: new Date('2002-07-04'),
    },
  });
  const persona2 = await prisma.persona.create({
    data: {
      dni: '02381613',
      nombres: 'Ramiro',
      apellido_paterno: 'Puma',
      apellido_materno: 'Ayala',
      telefono: '958003898',
      direccion: 'Av. El Maestro 566',
      sexo: 'Masculino',
      fecha_nacimiento: new Date('1964-04-07'),
    },
  });
  const persona3 = await prisma.persona.create({
    data: {
      dni: '02391189',
      nombres: 'Ana Maria',
      apellido_paterno: 'Mestas',
      apellido_materno: 'Chaiña',
      telefono: '979916388',
      direccion: 'Av. El Maestro 566',
      sexo: 'Femenino',
      fecha_nacimiento: new Date('1965-07-11'),
    },
  });
  const persona4 = await prisma.persona.create({
    data: {
      dni: '76854321',
      nombres: 'Brayhan Snik',
      apellido_paterno: 'Fernandes',
      apellido_materno: 'Ramos',
      telefono: '979916388',
      direccion: 'Av. El Maestro 566',
      sexo: 'Masculino',
      fecha_nacimiento: new Date('2002-05-16'),
    },
  });
  const persona5 = await prisma.persona.create({
    data: {
      dni: '72496996',
      nombres: 'Jean Lui',
      apellido_paterno: 'Zabala',
      apellido_materno: 'Melendez',
      telefono: '979916388',
      direccion: 'Av. El Maestro 566',
      sexo: 'Masculino',
      fecha_nacimiento: new Date('2001-07-12'),
    },
  });
  const persona6 = await prisma.persona.create({
    data: {
      dni: '72496997',
      nombres: 'Maricarmen',
      apellido_paterno: 'Tapia',
      apellido_materno: 'Calsin',
      telefono: '979916388',
      direccion: 'Av. El Maestro 566',
      sexo: 'Femenino',
      fecha_nacimiento: new Date('2002-07-10'),
    },
  });
  const persona7 = await prisma.persona.create({
    data: {
      dni: '72654567',
      nombres: 'Carlos',
      apellido_paterno: 'Garcia',
      apellido_materno: 'Lopez',
      telefono: '978654321',
      direccion: 'Av. Libertad 456',
      sexo: 'Masculino',
      fecha_nacimiento: new Date('1980-05-10'),
    },
  });
  const persona8 = await prisma.persona.create({
    data: {
      dni: '72334567',
      nombres: 'Sandra',
      apellido_paterno: 'Ramirez',
      apellido_materno: 'Torres',
      telefono: '956785432',
      direccion: 'Av. Progreso 123',
      sexo: 'Femenino',
      fecha_nacimiento: new Date('1982-11-20'),
    },
  });

  // Crear Usuarios
  const usuario1 = await prisma.usuario.create({
    data: {
      email: 'ever1ever14@gmail.com',
      password: passwordadmin,
      rol: 'Administrador',
      avatar: 'https://media.discordapp.net/attachments/735886562524528640/1293965831021002884/sexy_android_21_by_hphuc_dd2fazb-fullview.jpg?ex=67167a16&is=67152896&hm=50a11c4559315ac63ad1194ab54b83096a20ce10d2103929437edb030d50e47f&=&format=webp&width=818&height=662',
      Persona: {
        connect: { id: persona1.id },
      },
    },
  });
  const usuario2 = await prisma.usuario.create({
    data: {
      email: 'erpapuma@gmail.com',
      password: passwordadmin,
      rol: 'Docente',
      avatar: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png',
      Persona: {
        connect: { id: persona2.id },
      },
    },
  });
  const usuario3 = await prisma.usuario.create({
    data: {
      email: 'anamaria.mestas@gmail.com',
      password: passwordadmin,
      rol: 'Docente',
      avatar: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png',
      Persona: {
        connect: { id: persona3.id },
      },
    },
  });
  const usuario4 = await prisma.usuario.create({
    data: {
      email: 'carlos.garcia@gmail.com',
      password: passwordadmin,
      rol: 'Docente',
      avatar: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png',
      Persona: {
        connect: { id: persona7.id },
      },
    },
  });
  const usuario5 = await prisma.usuario.create({
    data: {
      email: 'sandra.ramirez@gmail.com',
      password: passwordadmin,
      rol: 'Docente',
      avatar: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png',
      Persona: {
        connect: { id: persona8.id },
      },
    },
  });


  const aula1 = await prisma.aula.create({
    data: {
      edificio: 1,
      piso: 1,
      numeroAula: 101,
    },
  });
  const aula2 = await prisma.aula.create({
    data: {
      edificio: 1,
      piso: 1,
      numeroAula: 102,
    },
  });
  const aula3 = await prisma.aula.create({
    data: {
      edificio: 1,
      piso: 1,
      numeroAula: 103,
    },
  });
  const aula4 = await prisma.aula.create({
    data: {
      edificio: 1,
      piso: 1,
      numeroAula: 104,
    },
  });
  const aula5 = await prisma.aula.create({
    data: {
      edificio: 1,
      piso: 2,
      numeroAula: 201,
    },
  });

  const area1 = await prisma.area.create({
    data: {
      nombrearea: "Matematica",
    },
  });

  const area2 = await prisma.area.create({
    data: {
      nombrearea: "Comunicacion",
    },
  });
  const area3 = await prisma.area.create({
    data: {
      nombrearea: "Arte",
    },
  });
  const area4 = await prisma.area.create({
    data: {
      nombrearea: "Educacion para el trabajo",
    },
  });
  const area5 = await prisma.area.create({
    data: {
      nombrearea: "Educacion Fisica",
    },
  });
  const area6 = await prisma.area.create({
    data: {
      nombrearea: "Educacion Religiosa",
    },
  });
  const area7 = await prisma.area.create({
    data: {
      nombrearea: "Ciencia y Ambiente",
    },
  });

  const curso1 = await prisma.curso.create({
    data: {
      areaid: 1,
    },
  });
  const curso2 = await prisma.curso.create({
    data: {
      areaid: 2,
    },
  });
  const curso3 = await prisma.curso.create({
    data: {
      areaid: 3,
    },
  });
  const curso4 = await prisma.curso.create({
    data: {
      areaid: 4,
    },
  });
  const curso5 = await prisma.curso.create({
    data: {
      areaid: 5,
    },
  });


  const docentecurso1 = await prisma.docenteCurso.create({
    data: {
      docente_id: 2,
      curso_id: 5,
    },
  });


  const gradoacademico1 = await prisma.gradoAcademico.create({
    data: {
      grado: 'Primero',
      seccion: 'A',
      tutor_id: usuario2.id,
      aula_id: aula1.id,
      turno: 'Dia',
    },
  });
  const gradoacademico2 = await prisma.gradoAcademico.create({
    data: {
      grado: 'Segundo',
      seccion: 'A',
      tutor_id: usuario4.id,
      aula_id: aula4.id,
      turno: 'Dia',
    },
  });

  const gradoacademico3 = await prisma.gradoAcademico.create({
    data: {
      grado: 'Tercero',
      seccion: 'B',
      tutor_id: usuario5.id,
      aula_id: aula5.id,
      turno: 'Tarde',
    },
  });

  const estudiante1 = await prisma.estudiante.create({
    data: {
      codigo_matricula: '2020-14019',
      persona_id: persona4.id,
      gradoAcademico_id: gradoacademico1.id,
    },
  });

  const estudiante2 = await prisma.estudiante.create({
    data: {
      codigo_matricula: '2020-14020',
      persona_id: persona5.id,
      gradoAcademico_id: gradoacademico1.id,
    },
  });
  const estudiante3 = await prisma.estudiante.create({
    data: {
      codigo_matricula: '2020-14021',
      persona_id: persona6.id,
      gradoAcademico_id: gradoacademico1.id,
    },
  });

  const estudiantesSegundoGrado = Array.from({ length: 10 }, (_, i) => ({
    codigo_matricula: `2021-200${i + 1}`,
    persona_id: persona1.id, // Puedes cambiar el ID de la persona para cada estudiante
    gradoAcademico_id: gradoacademico2.id,
  }));
  await prisma.estudiante.createMany({
    data: estudiantesSegundoGrado,
  });

  const estudiantesTerceroGrado = Array.from({ length: 10 }, (_, i) => ({
    codigo_matricula: `2021-300${i + 1}`,
    persona_id: persona2.id, // Puedes cambiar el ID de la persona para cada estudiante
    gradoAcademico_id: gradoacademico3.id,
  }));
  await prisma.estudiante.createMany({
    data: estudiantesTerceroGrado,
  });

  console.log('Datos iniciales adicionales creados.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
