/*
  Warnings:

  - Added the required column `docente_id` to the `Horario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Horario" ADD COLUMN     "docente_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Horario" ADD CONSTRAINT "Horario_docente_id_fkey" FOREIGN KEY ("docente_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
