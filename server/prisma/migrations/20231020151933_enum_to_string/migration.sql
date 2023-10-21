/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Action` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `name` on the `Action` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `action_name` on the `Events` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Events" DROP CONSTRAINT "Events_action_id_action_name_fkey";

-- AlterTable
ALTER TABLE "Action" DROP COLUMN "name",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Events" DROP COLUMN "action_name",
ADD COLUMN     "action_name" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Actions";

-- CreateIndex
CREATE UNIQUE INDEX "Action_name_key" ON "Action"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Action_id_name_key" ON "Action"("id", "name");

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_action_id_action_name_fkey" FOREIGN KEY ("action_id", "action_name") REFERENCES "Action"("id", "name") ON DELETE RESTRICT ON UPDATE CASCADE;
