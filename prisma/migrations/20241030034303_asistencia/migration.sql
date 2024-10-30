/*
  Warnings:

  - Added the required column `gradoAcademico_id` to the `Asistencia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Asistencia" ADD COLUMN     "gradoAcademico_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Asistencia" ADD CONSTRAINT "Asistencia_gradoAcademico_id_fkey" FOREIGN KEY ("gradoAcademico_id") REFERENCES "GradoAcademico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
