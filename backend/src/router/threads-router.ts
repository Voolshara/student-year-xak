const Router = require("express").Router;
import { Request, Response, NextFunction } from "express";

import authMiddleware, {
  AuthorizedRequest,
} from "../middlewares/auth-middleware";
import ApiError from "../exceptions/api-error";
import ThreadController from "../controllers/threads-controller";
import { ThreadsPut } from "../dtos/Thread-dtos";

export const threadsRoutes = Router();

threadsRoutes.get(
  "/users",
  authMiddleware,
  async (req: AuthorizedRequest, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      const controller = new ThreadController();
      const response = await controller.getUsers(user);
      return res.send(response);
    } catch (e) {
      next(e);
    }
  }
);

threadsRoutes.get(
  "/projects",
  authMiddleware,
  async (req: AuthorizedRequest, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      const controller = new ThreadController();
      const response = await controller.getProjects(user);
      return res.send(response);
    } catch (e) {
      next(e);
    }
  }
);

threadsRoutes.put(
  "/thread",
  authMiddleware,
  async (req: AuthorizedRequest, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      const Thread = req.body as ThreadsPut;
      console.log(Thread);
      const controller = new ThreadController();
      const response = await controller.addThread(Thread, user);
      return res.send(response);
    } catch (e) {
      next(e);
    }
  }
);

threadsRoutes.get(
  "/one_thread",
  authMiddleware,
  async (req: AuthorizedRequest, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      const { id } = req.query;

      if (id === undefined || id === null) {
        throw ApiError.BadRequestError("Request must contain id", {
          type: "Bad params",
        });
      }

      const controller = new ThreadController();
      const response = await controller.getThread(
        { id: parseInt(id as string) },
        user
      );
      return res.send(response);
    } catch (e) {
      next(e);
    }
  }
);

threadsRoutes.get(
  "/thread",
  authMiddleware,
  async (req: AuthorizedRequest, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      const { proj_id } = req.query;

      if (proj_id === undefined || proj_id === null) {
        throw ApiError.BadRequestError("Request must contain proj_id", {
          type: "Bad params",
        });
      }

      const controller = new ThreadController();
      const response = await controller.getThreads(
        { proj_id: parseInt(proj_id as string) },
        user
      );
      return res.send(response);
    } catch (e) {
      next(e);
    }
  }
);
