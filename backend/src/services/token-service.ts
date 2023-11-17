import jwt from "jsonwebtoken";
import { userDto } from "../dtos/user-dtos";
import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
import ApiError from "../exceptions/api-error";

config({
  path: ".env",
});

const prisma = new PrismaClient();

declare module "jsonwebtoken" {
  export interface UserDataJwtPayload extends JwtPayload {
    userId: number;
    userName: string;
    role: string;
  }
}

class TokenService {
  generateTokens(payload: userDto) {
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_ACCESS_SECRET as string,
      {
        expiresIn: "30m",
      }
    );

    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET as string,
      {
        expiresIn: "30d",
      }
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token: string): userDto | undefined {
    try {
      const { userId, login, role } = <jwt.UserDataJwtPayload>(
        jwt.verify(token, process.env.JWT_ACCESS_SECRET as string)
      );
      return { userId, login, role };
    } catch (e) {
      return undefined;
    }
  }

  async validateRefreshToken(token: string): Promise<userDto | undefined> {
    try {
      const { userId, login, role } = <jwt.UserDataJwtPayload>(
        jwt.verify(token, process.env.JWT_REFRESH_SECRET as string)
      );
      const tokenData = await prisma.tokens.findMany({
        where: {
          refreshToken: token,
          status: true,
        },
        orderBy: {
          createTime: "desc",
        },
      });

      const nowDate = Date.now();
      if (
        nowDate - tokenData[0].createTime.getTime() >
        30 * 24 * 60 * 60 * 1000
      ) {
        throw ApiError.UnathorizedError();
      }

      return { userId, login, role };
    } catch (e) {
      return undefined;
    }
  }

  async saveToken(userId: number, refreshToken: string) {
    await prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        Tokens: {
          create: { refreshToken: refreshToken },
        },
      },
      include: {
        Tokens: {
          orderBy: {
            createTime: "desc",
          },
        },
      },
    });
  }

  async removeToken(userId: number) {
    const tokens = await prisma.tokens.findMany({
      where: {
        status: true,
        user: {
          id: userId,
        },
      },
      orderBy: {
        createTime: "desc",
      },
    });

    if (tokens.length == 0) {
      throw ApiError.UnathorizedError();
    }

    await prisma.tokens.update({
      where: {
        id: tokens[0].id,
      },
      data: {
        status: false,
      },
    });
  }

  async findToken(refreshToken: string) {
    return await prisma.tokens.findFirst({
      where: {
        refreshToken: refreshToken,
      },
    });
  }
}

export default new TokenService();
