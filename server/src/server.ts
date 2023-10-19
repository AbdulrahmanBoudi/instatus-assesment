import dotenv from "dotenv";
import express from "express";
import * as bodyParser from "body-parser";
import router from "./router/router";
const app = express();
//constants
const PORT = 3000;
dotenv.config();

//middleware
app.use(bodyParser.json());

app.use("/test", router);
// app.get("/", async (req, res) => {
//   const users = await prisma.user.findMany();
//   res.json(users);
// });

app.listen(PORT, () => console.log(`server is up on port ${PORT}`));
