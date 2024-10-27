/*
  Warnings:

  - You are about to drop the `area` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Curso" DROP CONSTRAINT "Curso_areaid_fkey";

-- DropTable
DROP TABLE "area";

-- CreateTable
CREATE TABLE "Area" (
    "id" SERIAL NOT NULL,
    "nombrearea" TEXT NOT NULL,

    CONSTRAINT "Area_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Area_nombrearea_key" ON "Area"("nombrearea");

-- AddForeignKey
ALTER TABLE "Curso" ADD CONSTRAINT "Curso_areaid_fkey" FOREIGN KEY ("areaid") REFERENCES "Area"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
