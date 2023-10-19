import prisma from "../../../db/prisma";
import { Events, Action, Actions, Prisma, User } from "@prisma/client";
async function getEvents() {
  const events = await prisma.events.findMany();
  return events;
}
async function createEvent(
  // event: Events,
  action_name: Actions,
  actor_id: string,
  target_id?: string
): Promise<Events> {
  const meta = await createMetadata(action_name);
  const action = await getActionByName(action_name);
  if (meta && action) {
    const res = await prisma.events
      .create({
        data: {
          group: "test-group",
          location: "ip",
          object: "event",
          action_id: action,
          actor_id,
          occured_at: new Date(),
          target_id,
          metadata_id: meta.x_request_id,
        },
      })
      .then((res) => {
        return res;
      })

      .catch((e) => {
        throw e;
      });
    return res;
  } else {
    throw Error("Couldnt create event");
  }
}
//Action service
async function getActionByName(action: Actions) {
  const actionObj = await prisma.action.findFirstOrThrow({
    where: { name: action },
  });
  return actionObj?.id;
}
//User service
async function getUserIdByName(user_name: string) {
  const user = await prisma.user.findFirstOrThrow({
    where: { name: user_name },
    select: { id: true },
  });

  return user;
}

//metadata service
async function createMetadata(action_name: string) {
  const meta = prisma.metadata.create({
    data: { description: action_name, redirect: "/" },
  });
  return meta;
}

export const eventsService = { getEvents, createEvent, getUserIdByName };
