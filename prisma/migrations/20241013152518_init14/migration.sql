-- CreateEnum
CREATE TYPE "TipoEntrada" AS ENUM ('Noticia', 'Comunicado', 'Evento');

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

-- AddForeignKey
ALTER TABLE "Entrada" ADD CONSTRAINT "Entrada_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
