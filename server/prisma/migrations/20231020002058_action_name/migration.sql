/*
  Warnings:

  - A unique constraint covering the columns `[id,name]` on the table `Action` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `action_name` to the `Events` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Events" DROP CONSTRAINT "Events_action_id_fkey";

-- AlterTable
ALTER TABLE "Action" ALTER COLUMN "id" SET DEFAULT prefix_uuid('evt_act_'::text);

-- AlterTable
ALTER TABLE "Events" ADD COLUMN     "action_name" "Actions" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Action_id_name_key" ON "Action"("id", "name");

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_action_id_action_name_fkey" FOREIGN KEY ("action_id", "action_name") REFERENCES "Action"("id", "name") ON DELETE RESTRICT ON UPDATE CASCADE;
