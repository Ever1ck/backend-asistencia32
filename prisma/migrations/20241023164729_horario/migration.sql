/*
  Warnings:

  - Added the required column `turno` to the `Horario` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `horaInicio` on the `Horario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `horaFin` on the `Horario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "HoraH" AS ENUM ('Primera_Hora', 'Segunda_Hora', 'Tercera_Hora', 'Cuarta_Hora', 'Quinta_Hora', 'Sexta_Hora', 'Septima_Hora');

-- CreateEnum
CREATE TYPE "TurnoH" AS ENUM ('Dia', 'Tarde');

-- AlterTable
ALTER TABLE "Horario" ADD COLUMN     "turno" "TurnoH" NOT NULL,
DROP COLUMN "horaInicio",
ADD COLUMN     "horaInicio" "HoraH" NOT NULL,
DROP COLUMN "horaFin",
ADD COLUMN     "horaFin" "HoraH" NOT NULL;
