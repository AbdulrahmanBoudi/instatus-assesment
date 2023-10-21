import * as express from "express";
import prisma from "../../db/prisma";
import { eventsService } from "../services/events/events.service";
import { Prisma } from "@prisma/client";

const router = express.Router();

router.post("/events", async (req, res) => {
  const { page, offset } = req.body;
  try {
    const events = await eventsService.getEvents(page, offset);

    res.json({ events, page: page, offset: offset });
  } catch (error) {
    return error;
  }
});

router.post("/events/search", async (req, res) => {
  const { param } = req.query;

  try {
    const results =
      param && (await eventsService.searchEvent(param?.toString()));
    res.json(results);
  } catch (e) {
    return e;
  }
});

router.get("*", async (req, res) => {
  if (res.status(400)) {
    res.send("400 page");
  }
  res.status(404).end();
});
router.post("/createevents", async (req, res) => {
  const { user_name, email, action_name, target_email } = req.body;
  try {
    const eventToCreate = await eventsService.createEvent(
      action_name,
      email,
      user_name,
      target_email
    );
    res.json(eventToCreate);
  } catch (e) {
    if (!(e instanceof Prisma.PrismaClientKnownRequestError)) {
      res.status(400).json(e);
    } else {
      res.sendStatus(400);
    }
  }
});

export default router;
