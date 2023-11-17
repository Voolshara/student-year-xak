const Router = require("express").Router;
import { Request, Response, NextFunction } from "express";

import authMiddleware, {
  AuthorizedRequest,
} from "../middlewares/auth-middleware";
import ApiError from "../exceptions/api-error";
import DeiviceController from "../controllers/device-controller";

export const deviceRoutes = Router();

deviceRoutes.put(
  "/project",
  authMiddleware,
  async (req: AuthorizedRequest, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      const { deviceName } = req.body;
      if (deviceName === undefined || deviceName === null) {
        throw ApiError.BadRequestError("Request must contain deviceName", {
          type: "Bad params",
        });
      }

      const controller = new DeiviceController();
      const response = controller.addDevice({ deviceName }, user);
      return res.json(response);
    } catch (e) {
      next(e);
    }
  }
);

deviceRoutes.get(
  "/project",
  authMiddleware,
  async (req: AuthorizedRequest, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      const controller = new DeiviceController();
      const response = await controller.getDevices(user);
      return res.send(response);
    } catch (e) {
      next(e);
    }
  }
);
