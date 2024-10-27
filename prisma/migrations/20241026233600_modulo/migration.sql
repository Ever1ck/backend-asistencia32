-- CreateTable
CREATE TABLE "Modulo" (
    "id" SERIAL NOT NULL,
    "rol" "RolUsuario" NOT NULL,
    "modulos" TEXT[],

    CONSTRAINT "Modulo_pkey" PRIMARY KEY ("id")
);
