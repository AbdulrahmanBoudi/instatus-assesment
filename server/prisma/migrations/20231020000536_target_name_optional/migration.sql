/*
  Warnings:

  - A unique constraint covering the columns `[id,name]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `actor_name` to the `Events` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Events" DROP CONSTRAINT "Events_actor_id_fkey";

-- DropForeignKey
ALTER TABLE "Events" DROP CONSTRAINT "Events_target_id_fkey";

-- AlterTable
ALTER TABLE "Events" ADD COLUMN     "actor_name" TEXT NOT NULL,
ADD COLUMN     "target_name" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_id_name_key" ON "User"("id", "name");

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_actor_id_actor_name_fkey" FOREIGN KEY ("actor_id", "actor_name") REFERENCES "User"("id", "name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_target_id_target_name_fkey" FOREIGN KEY ("target_id", "target_name") REFERENCES "User"("id", "name") ON DELETE SET NULL ON UPDATE CASCADE;
