import * as express from "express";
import prisma from "../../db/prisma";
import { eventsService } from "../services/events/events.service";
import { Prisma } from "@prisma/client";

const router = express.Router();

router.get("/events", async (req, res) => {
  res.json(eventsService.getEvents());
});
router.get("*", async (req, res) => {
  if (res.status(400)) {
    res.send("400 page");
  }
  res.status(404).end();
});
router.post("/events/:id", async (req, res) => {
  // try {
  //   let user = await eventsService.getUserIdByName("tester");
  //   const eventToCreate = await eventsService.createEvent(
  //     "LOGGED_IN",
  //     user?.id
  //   );
  //   res.json(eventToCreate);
  // } catch (e) {
  //   if (!(e instanceof Prisma.PrismaClientKnownRequestError)) {
  //     res.status(400).json(e);
  //   } else {
  //     res.sendStatus(400);
  //   }
  // }
});

export default router;
