const Router = require("express").Router;

import { Request, Response, NextFunction } from "express";
import UserController from "../controllers/user-controller";

import authMiddleware, {
  AuthorizedRequest,
} from "../middlewares/auth-middleware";

export const userRoutes = Router();

userRoutes.post(
  "/registration",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userName, login, password } = req.body;
      const controller = new UserController();
      const userData = await controller.registration({
        userName: userName,
        login,
        password,
      });

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      res.cookie("accessToken", userData.accessToken, {
        maxAge: 30 * 60 * 1000,
        httpOnly: true,
      });

      return res.send(userData);
    } catch (error) {
      next(error);
    }
  }
);

userRoutes.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { login, password } = req.body;
      const controller = new UserController();
      const userData = await controller.login({ login, password });

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      res.cookie("accessToken", userData.accessToken, {
        maxAge: 30 * 60 * 1000,
        httpOnly: true,
      });

      return res.send(userData);
    } catch (error) {
      next(error);
    }
  }
);

userRoutes.get(
  "/refresh",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.cookies;
      const controller = new UserController();
      const userData = await controller.refreshTokens({ refreshToken });

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      res.cookie("accessToken", userData.accessToken, {
        maxAge: 30 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
);

userRoutes.post(
  "/logout",
  authMiddleware,
  async (req: AuthorizedRequest, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      const controller = new UserController();
      const response = await controller.deleteTokens(user);
      res.clearCookie("refreshToken");
      return res.json(response);
    } catch (e) {
      next(e);
    }
  }
);

userRoutes.get(
  "/user",
  authMiddleware,
  async (req: AuthorizedRequest, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      const controller = new UserController();
      const response = await controller.getUserData(user);
      return res.json(response);
    } catch (e) {
      next(e);
    }
  }
);

// userRoutes.post(
//   "/new_password",
//   authMiddleware,
//   async (req: AuthorizedRequest, res: Response, next: NextFunction) => {
//     try {
//       const { password } = req.body; // phone достаём из JWT
//       const userData = req.user;

//       const controller = new UserController();
//       const response = await controller.newPassword(userData.phone, {
//         password,
//       });
//       return res.send(response);
//     } catch (error) {
//       next(error);
//     }
//   }
// );
