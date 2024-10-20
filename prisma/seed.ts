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
      fecha_nacimiento: new Date('1965-07-11'),
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

  const gradoacademico1 = await prisma.gradoAcademico.create({
    data: {
      grado: 'Primero',
      seccion: 'A',
      tutor_id: usuario2.id,
      aula_id: aula1.id,
      turno: 'Dia',
    },
  });

  const estudiante1 = await prisma.estudiante.create({
    data: {
      codigo_matricula: '2020-14019',
      persona_id: persona4.id,
      gradoAcademico_id: gradoacademico1.id,
    },
  });

  console.log('Datos iniciales creados.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
