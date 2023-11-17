import { Request, Response, NextFunction } from "express";
import PingController from "../controllers/ping-controller";
import { userRoutes } from "./user-routers";
import { threadsRoutes } from "./threads-router";
const Router = require("express").Router;

const router = new Router();

router.use("/", userRoutes);
router.use("/", threadsRoutes);

router.get(
  "/ping",
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const controller = new PingController();
      const response = await controller.getMessage();
      return res.send(response);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
