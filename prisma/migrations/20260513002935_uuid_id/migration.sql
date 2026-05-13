/*
  Warnings:

  - The primary key for the `Pacientes` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Pacientes" DROP CONSTRAINT "Pacientes_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Pacientes_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Pacientes_id_seq";
