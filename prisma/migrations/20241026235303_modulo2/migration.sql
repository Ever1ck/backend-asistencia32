/*
  Warnings:

  - A unique constraint covering the columns `[rol]` on the table `Modulo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Modulo_rol_key" ON "Modulo"("rol");
