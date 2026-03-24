import type { Request, Response } from "express";
import { Router } from "express";
import waitlistRoutes from "../modules/waitlist/route"

const v1Router = Router();

v1Router.get("/health", (_req: Request, res:Response) => {
  res.json({ status: "ok" });
});

v1Router.use("/waitlist",waitlistRoutes)

export default v1Router;