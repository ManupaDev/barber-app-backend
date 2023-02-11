import express, { Request, Response } from "express";
import userRouter from "./routers/userRouter";
import slotRouter from "./routers/slotRouter";
import { Prisma, PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();
const cors = require('cors')

const app = express();

//! Global Midlleware
app.use(cors());
app.use(express.json());

//! Mount Routers
app.use("/api/users", userRouter);
// app.use("/api/availabilities", userRouter);
app.use("/api/slots", slotRouter);

const server = app.listen(8000, () => {
  console.log(`🚀 Server ready at: http://localhost:8000`);
});
