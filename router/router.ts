import * as express from "express";
import prisma from "../db/prisma";

const router = express.Router();

router.get("/events", async (req, res) => {
  const event = await prisma.events.findFirst();
  res.json(event);
  console.log("req");
});
router.get("*", async (req, res) => {
  res.status(404).send("not found");
});

export default router;
