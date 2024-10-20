-- CreateEnum
CREATE TYPE "SexoPersona" AS ENUM ('Masculino', 'Femenino');

-- CreateEnum
CREATE TYPE "RolUsuario" AS ENUM ('Usuario', 'Docente', 'Auxiliar', 'Secretaria', 'Innovacion', 'Subdirector', 'Director', 'Administrador');

-- CreateEnum
CREATE TYPE "GradoAc" AS ENUM ('Primero', 'Segundo', 'Tercero', 'Cuarto', 'Quinto');

-- CreateEnum
CREATE TYPE "TurnoAc" AS ENUM ('Dia', 'Tarde');

-- CreateEnum
CREATE TYPE "DiaH" AS ENUM ('Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes');

-- CreateEnum
CREATE TYPE "EstadoAsis" AS ENUM ('Presente', 'Tardanza', 'Falta', 'Justicado');

-- CreateEnum
CREATE TYPE "TipoJust" AS ENUM ('JUSTIFICACION', 'ACTIVIDADEXTRACURRICULAR');

-- CreateEnum
CREATE TYPE "EstadoResolucion" AS ENUM ('PENDIENTE', 'APROBADO', 'RECHAZADO');

-- CreateEnum
CREATE TYPE "EstadoJustificacion" AS ENUM ('Pendiente', 'Aprobado', 'Rechazado');

-- CreateEnum
CREATE TYPE "TipoEntrada" AS ENUM ('Noticia', 'Comunicado', 'Evento');

-- CreateTable
CREATE TABLE "Persona" (
    "id" SERIAL NOT NULL,
    "dni" VARCHAR(8) NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellido_paterno" TEXT NOT NULL,
    "apellido_materno" TEXT NOT NULL,
    "telefono" TEXT,
    "direccion" TEXT,
    "fecha_nacimiento" TIMESTAMP(3) NOT NULL,
    "sexo" "SexoPersona" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Persona_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol" "RolUsuario" NOT NULL,
    "avatar" TEXT,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "Persona_id" INTEGER NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estudiante" (
    "id" SERIAL NOT NULL,
    "codigo_matricula" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "persona_id" INTEGER NOT NULL,
    "gradoAcademico_id" INTEGER NOT NULL,

    CONSTRAINT "Estudiante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aula" (
    "id" SERIAL NOT NULL,
    "edificio" INTEGER NOT NULL,
    "piso" INTEGER NOT NULL,
    "numeroAula" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Aula_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GradoAcademico" (
    "id" SERIAL NOT NULL,
    "grado" "GradoAc" NOT NULL,
    "seccion" TEXT NOT NULL,
    "tutor_id" INTEGER NOT NULL,
    "aula_id" INTEGER NOT NULL,
    "turno" "TurnoAc" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GradoAcademico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Curso" (
    "id" SERIAL NOT NULL,
    "area" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocenteCurso" (
    "id" SERIAL NOT NULL,
    "docente_id" INTEGER NOT NULL,
    "curso_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DocenteCurso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Horario" (
    "id" SERIAL NOT NULL,
    "gradoAcademico_id" INTEGER NOT NULL,
    "curso_id" INTEGER NOT NULL,
    "dia" "DiaH" NOT NULL,
    "horaInicio" TEXT NOT NULL,
    "horaFin" TEXT NOT NULL,

    CONSTRAINT "Horario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Asistencia" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "curso_id" INTEGER NOT NULL,
    "estudiante_id" INTEGER NOT NULL,
    "estadoAsistencia" "EstadoAsis" NOT NULL,

    CONSTRAINT "Asistencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resolucion" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "estado" "EstadoResolucion" NOT NULL,
    "documento_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Resolucion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Justificacion" (
    "id" SERIAL NOT NULL,
    "fecha_inicio" TIMESTAMP(3) NOT NULL,
    "fecha_fin" TIMESTAMP(3) NOT NULL,
    "tipo_justificacion" "TipoJust" NOT NULL,
    "motivo" TEXT NOT NULL,
    "resolucion_id" INTEGER NOT NULL,
    "estado" "EstadoJustificacion" NOT NULL DEFAULT 'Pendiente',
    "estudiante_id" INTEGER NOT NULL,
    "secretaria_id" INTEGER NOT NULL,
    "director_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Justificacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notificacion" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mensaje" TEXT NOT NULL,
    "enviado" BOOLEAN NOT NULL DEFAULT false,
    "estudiante_id" INTEGER NOT NULL,

    CONSTRAINT "Notificacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entrada" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "portada_url" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "tipo_entrada" "TipoEntrada" NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado_entrada" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Entrada_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Persona_dni_key" ON "Persona"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_Persona_id_key" ON "Usuario"("Persona_id");

-- CreateIndex
CREATE UNIQUE INDEX "Estudiante_codigo_matricula_key" ON "Estudiante"("codigo_matricula");

-- CreateIndex
CREATE UNIQUE INDEX "Estudiante_persona_id_key" ON "Estudiante"("persona_id");

-- CreateIndex
CREATE UNIQUE INDEX "Curso_area_key" ON "Curso"("area");

-- CreateIndex
CREATE UNIQUE INDEX "Justificacion_resolucion_id_key" ON "Justificacion"("resolucion_id");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_Persona_id_fkey" FOREIGN KEY ("Persona_id") REFERENCES "Persona"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estudiante" ADD CONSTRAINT "Estudiante_persona_id_fkey" FOREIGN KEY ("persona_id") REFERENCES "Persona"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estudiante" ADD CONSTRAINT "Estudiante_gradoAcademico_id_fkey" FOREIGN KEY ("gradoAcademico_id") REFERENCES "GradoAcademico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GradoAcademico" ADD CONSTRAINT "GradoAcademico_tutor_id_fkey" FOREIGN KEY ("tutor_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GradoAcademico" ADD CONSTRAINT "GradoAcademico_aula_id_fkey" FOREIGN KEY ("aula_id") REFERENCES "Aula"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocenteCurso" ADD CONSTRAINT "DocenteCurso_docente_id_fkey" FOREIGN KEY ("docente_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocenteCurso" ADD CONSTRAINT "DocenteCurso_curso_id_fkey" FOREIGN KEY ("curso_id") REFERENCES "Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Horario" ADD CONSTRAINT "Horario_gradoAcademico_id_fkey" FOREIGN KEY ("gradoAcademico_id") REFERENCES "GradoAcademico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Horario" ADD CONSTRAINT "Horario_curso_id_fkey" FOREIGN KEY ("curso_id") REFERENCES "Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asistencia" ADD CONSTRAINT "Asistencia_curso_id_fkey" FOREIGN KEY ("curso_id") REFERENCES "Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asistencia" ADD CONSTRAINT "Asistencia_estudiante_id_fkey" FOREIGN KEY ("estudiante_id") REFERENCES "Estudiante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Justificacion" ADD CONSTRAINT "Justificacion_resolucion_id_fkey" FOREIGN KEY ("resolucion_id") REFERENCES "Resolucion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Justificacion" ADD CONSTRAINT "Justificacion_estudiante_id_fkey" FOREIGN KEY ("estudiante_id") REFERENCES "Estudiante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Justificacion" ADD CONSTRAINT "Justificacion_secretaria_id_fkey" FOREIGN KEY ("secretaria_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Justificacion" ADD CONSTRAINT "Justificacion_director_id_fkey" FOREIGN KEY ("director_id") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notificacion" ADD CONSTRAINT "Notificacion_estudiante_id_fkey" FOREIGN KEY ("estudiante_id") REFERENCES "Estudiante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entrada" ADD CONSTRAINT "Entrada_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
