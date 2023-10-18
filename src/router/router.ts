import * as express from "express";
import prisma from "../../db/prisma";
import { eventsService } from "../services/events/events.service";

const router = express.Router();

router.get("/events", async (req, res) => {
  res.json(eventsService.getEvents());
});
router.get("*", async (req, res) => {
  res.status(404).send("not found");
});

export default router;
