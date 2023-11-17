import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import {
  userDto,
  succesAuthDto,
  userRigistration,
  userLogin,
  userData,
} from "../dtos/user-dtos";

import { SuccesReq } from "../dtos/global-dtos";

import ApiError from "../exceptions/api-error";
import tokenService from "./token-service";

const prisma = new PrismaClient();

class UserService {
  async registration(
    userRegistration: userRigistration
  ): Promise<succesAuthDto> {
    const candidate = await prisma.userAuth.findFirst({
      where: { login: userRegistration.login },
    });

    if (candidate) {
      throw ApiError.UserExist("Пользователь уже зарегистрирован");
    }

    // const role = phone === "1" ? "admin" : "user";
    const role = "user";
    const hashPassword = await bcrypt.hash(userRegistration.password, 3);
    const newUser = await prisma.user.create({
      data: {
        userName: userRegistration.userName,
        role: role,
        UserAuthes: {
          create: {
            login: userRegistration.login,
            password: hashPassword,
          },
        },
      },
      include: {
        UserAuthes: {
          orderBy: {
            createTime: "desc",
          },
        },
      },
    });

    const userData = {
      userId: newUser.id,
      login: newUser.UserAuthes[0].login,
      role: newUser.role,
    } as userDto;

    const tokens = tokenService.generateTokens({ ...userData });
    await tokenService.saveToken(newUser.id, tokens.refreshToken);
    return { ...tokens, user: userData };
  }

  async login(loginData: userLogin): Promise<succesAuthDto> {
    let authData = await prisma.userAuth.findFirst({
      where: {
        login: loginData.login,
      },
      include: {
        user: true,
      },
    });

    if (!authData) {
      throw ApiError.BadRequestError("Такого пользователя нет", {
        type: "NoUser",
      });
    }

    const isPassEquals = await bcrypt.compare(
      loginData.password,
      authData.password
    );

    if (!isPassEquals) {
      throw ApiError.BadRequestError("Неверный логин или пароль", {
        type: "WrongPassword",
      });
    }

    const userData = {
      userId: authData.user.id,
      login: authData.login,
      role: authData.user.role,
    } as userDto;

    const tokens = tokenService.generateTokens({ ...userData });
    await tokenService.saveToken(userData.userId, tokens.refreshToken);
    return { ...tokens, user: userData };
  }

  async refreshTokens(refreshToken: string): Promise<succesAuthDto> {
    if (!refreshToken) {
      throw ApiError.UnathorizedError();
    }

    const userData = await tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.UnathorizedError;
    }

    const user = await prisma.user.findFirst({
      where: {
        id: userData.userId,
      },
      include: {
        UserAuthes: {
          orderBy: {
            createTime: "desc",
          },
        },
      },
    });

    if (!user) {
      throw ApiError.BadRequestError("Такого пользователя нет", {
        type: "NoUser",
      });
    }

    const userDto = {
      userId: user.id,
      login: user.UserAuthes[0].login,
      role: user.role,
    } as userDto;
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.userId, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async deleteTokens(user: userDto): Promise<SuccesReq> {
    const token = await tokenService.removeToken(user.userId);
    return {
      message: "success",
    };
  }

  async getUserData(user: userDto): Promise<userData> {
    const userData = await prisma.user.findFirstOrThrow({
      where: {
        id: user.userId,
      },
    });
    return {
      userName: userData.userName,
      role: userData.role,
    };
  }
}

export default new UserService();
