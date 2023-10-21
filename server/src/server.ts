import dotenv from "dotenv";
import express from "express";
import * as bodyParser from "body-parser";
import router from "./router/router";
import cors from "cors";
const app = express();
//constants
const PORT = 3300;
dotenv.config();

//middleware
app.use(bodyParser.json());
app.use(cors());

app.use("/test", router);
// app.get("/", async (req, res) => {
//   const users = await prisma.user.findMany();
//   res.json(users);
// });

app.listen(PORT, () => console.log(`server is up on port ${PORT}`));
