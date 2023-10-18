import prisma from "../../../db/prisma";
import { Events, Action, Actions } from "@prisma/client";
async function getEvents() {
  const events = await prisma.events.findMany();
  return events;
}
async function createEvent(event: Events) {
  const eventRes = await prisma.events.create({
    data: event,
  });
  return eventRes;
}
// async function createAction(action: Action) {
//   const actionRes = await prisma.action.create({
//     data: {
//       name: "LOGGED_IN",
//       object: "event_action",
//     },
//   });
// }

export const eventsService = { getEvents, createEvent };
