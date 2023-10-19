/*
  Warnings:

  - You are about to drop the column `actor_name` on the `Events` table. All the data in the column will be lost.
  - You are about to drop the column `target_name` on the `Events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Events" DROP COLUMN "actor_name",
DROP COLUMN "target_name",
ALTER COLUMN "target_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_target_id_fkey" FOREIGN KEY ("target_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
