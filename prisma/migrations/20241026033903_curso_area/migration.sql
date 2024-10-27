/*
  Warnings:

  - You are about to drop the column `area` on the `Curso` table. All the data in the column will be lost.
  - Added the required column `areaid` to the `Curso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `Curso` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Curso_area_key";

-- AlterTable
ALTER TABLE "Curso" DROP COLUMN "area",
ADD COLUMN     "areaid" INTEGER NOT NULL,
ADD COLUMN     "nombre" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "area" (
    "id" SERIAL NOT NULL,
    "nombrearea" TEXT NOT NULL,

    CONSTRAINT "area_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "area_nombrearea_key" ON "area"("nombrearea");

-- AddForeignKey
ALTER TABLE "Curso" ADD CONSTRAINT "Curso_areaid_fkey" FOREIGN KEY ("areaid") REFERENCES "area"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
