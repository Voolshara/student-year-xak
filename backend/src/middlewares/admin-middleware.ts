import { Request, Response, NextFunction } from "express";
import ApiError from "../exceptions/api-error";
import tokenService from "../services/token-service";
import { userDto } from "../dtos/user-dtos";

export interface AuthorizedRequest extends Request {
  user: userDto;
}

export default function (
  req: AuthorizedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(ApiError.UnathorizedError()); //
    }

    const accessToken = authHeader.split(" ")[1];

    if (!accessToken) {
      return next(ApiError.UnathorizedError()); //
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (userData === undefined) {
      return next(ApiError.UnathorizedError()); //
    }

    req.user = userData;

    if (!req.user.isAdmin) {
      return next(ApiError.NotAdminError());
    }

    next();
  } catch (e) {
    return next(ApiError.UnathorizedError()); //
  }
}
