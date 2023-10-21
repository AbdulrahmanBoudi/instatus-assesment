CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE OR REPLACE FUNCTION prefix_uuid(prefix text) RETURNS text AS $$
BEGIN
    RETURN concat(prefix, gen_random_uuid());
END;
$$ LANGUAGE PLPGSQL VOLATILE;
-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL DEFAULT prefix_uuid('user_'::text),
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Events" (
    "id" TEXT NOT NULL DEFAULT prefix_uuid('evt_'::text),
    "object" TEXT NOT NULL,
    "actor_id" TEXT NOT NULL,
    "actor_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "action_id" TEXT NOT NULL,
    "action_name" TEXT NOT NULL,
    "target_id" TEXT,
    "target_name" TEXT,
    "location" TEXT NOT NULL,
    "occured_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "metadata_id" TEXT NOT NULL,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Action" (
    "id" TEXT NOT NULL DEFAULT prefix_uuid('evt_act_'::text),
    "object" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Metadata" (
    "redirect" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "x_request_id" TEXT NOT NULL DEFAULT prefix_uuid('req_'::text),

    CONSTRAINT "Metadata_pkey" PRIMARY KEY ("x_request_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_name_email_key" ON "User"("id", "name", "email");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_name_key" ON "User"("id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Events_metadata_id_key" ON "Events"("metadata_id");

-- CreateIndex
CREATE UNIQUE INDEX "Action_name_key" ON "Action"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Action_id_name_key" ON "Action"("id", "name");

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_actor_id_actor_name_email_fkey" FOREIGN KEY ("actor_id", "actor_name", "email") REFERENCES "User"("id", "name", "email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_action_id_action_name_fkey" FOREIGN KEY ("action_id", "action_name") REFERENCES "Action"("id", "name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_target_id_target_name_fkey" FOREIGN KEY ("target_id", "target_name") REFERENCES "User"("id", "name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_metadata_id_fkey" FOREIGN KEY ("metadata_id") REFERENCES "Metadata"("x_request_id") ON DELETE RESTRICT ON UPDATE CASCADE;
