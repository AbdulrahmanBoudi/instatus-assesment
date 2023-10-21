import prisma from "../../../db/prisma";
import { Events, Action, Prisma, User } from "@prisma/client";
import { usersService } from "../users/users.service";
async function getEvents(page: number, offset: number) {
  if (!page && !offset) {
    const events = await prisma.events.findMany({});
    return events;
  } else {
    const events = await prisma.events.findMany({
      skip: (page - 1) * offset,
      take: offset,
      orderBy: { occured_at: "desc" },
    });
    return events;
  }
}
async function getCount() {
  const count = await prisma.events.count({ select: { _all: true } });
  return count._all;
}
async function createEvent(
  // event: Events,
  action_name: string,
  user_email: string,
  user_name?: string,
  target_email?: string
): Promise<Events> {
  const meta = await createMetadata(action_name);
  const action = await getActionByName(action_name);
  let user: User | any = await usersService.getUserDetailsByEmail(user_email);
  if (!user) {
    user = user_name && (await usersService.createUser(user_email, user_name));
  }
  if (user && user_name && user.name != user_name) {
    user = user_name && (await usersService.updateUser(user_name, user.id));
  }
  let target: User | any =
    target_email && (await usersService.getUserDetailsByEmail(target_email));
  if (meta && action && user) {
    const res = await prisma.events
      .create({
        data: {
          group: "test-group",
          location: "ip",
          object: "event",
          action_id: action,
          actor_id: user.id,
          occured_at: new Date(),
          target_id: target?.id,
          metadata_id: meta.x_request_id,
          actor_name: user.name,
          action_name: action_name,
          email: user_email,
          target_name: target?.name,
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
async function searchEvent(search_param: string): Promise<Events[]> {
  try {
    const results = await prisma.events.findMany({
      where: {
        OR: [
          { action_id: { contains: search_param } },
          { actor_name: { contains: search_param } },
          { actor_id: { contains: search_param } },
          { action_name: { contains: search_param } },
        ],
      },
    });
    return results;
  } catch (e) {
    throw e;
  }
}

//Action service
async function getActionByName(action: string) {
  const actionObj = await prisma.action.findFirstOrThrow({
    where: { name: action },
  });
  return actionObj?.id;
}
//User service

//metadata service
async function createMetadata(action_name: string) {
  const meta = prisma.metadata.create({
    data: { description: action_name, redirect: "/" },
  });
  return meta;
}

export const eventsService = { getEvents, createEvent, searchEvent, getCount };
