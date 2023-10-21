/*
  Warnings:

  - A unique constraint covering the columns `[id,name,email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Events` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Events" DROP CONSTRAINT "Events_actor_id_actor_name_fkey";

-- AlterTable
ALTER TABLE "Events" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_id_name_email_key" ON "User"("id", "name", "email");

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_actor_id_actor_name_email_fkey" FOREIGN KEY ("actor_id", "actor_name", "email") REFERENCES "User"("id", "name", "email") ON DELETE RESTRICT ON UPDATE CASCADE;
