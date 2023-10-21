import { Events } from "../../models/events";
import client from "../client";

export async function getEvents(
  page: number,
  offset: number
): Promise<{
  data?: { events: Events[]; page: number; offset: number };
  status: number;
}> {
  const result = await client
    .post({ url: "test/events", data: { page, offset } })
    .then((res) => {
      return { data: res.data, status: res.status };
    })
    .catch((e) => {
      return { status: e.response.status };
    });
  return result;
}

export async function searchEvents(
  params: string
): Promise<{ data?: Events[]; status: number }> {
  const result = await client
    .post({ url: `test/events/search?param=${params}` })
    .then((res) => {
      return { data: res.data, status: res.status };
    })
    .catch((e) => {
      return { status: e.response.status };
    });
  return result;
}

export async function createEvent({
  email,
  action_name,
  user_name,
  target_email,
}: {
  email: string;
  action_name: string;
  user_name?: string;
  target_email?: string;
}): Promise<number> {
  const result = await client
    .post({
      url: "test/createevents",
      data: { user_name, email, action_name, target_email },
    })
    .then((res) => {
      return res.status;
    })
    .catch((e) => {
      return e.response.status;
    });
  return result;
}
export async function getCount(): Promise<number> {
  const result = await client
    .get({ url: "test/events/count" })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      return e.response.status;
    });
  return result;
}
