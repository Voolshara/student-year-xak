import UserService from "../services/user-service";
import {
  Post,
  Route,
  Body,
  Response,
  Tags,
  Hidden,
  Security,
  Queries,
  Get,
  Query,
} from "tsoa";
import {
  refreshTokens,
  succesAuthDto,
  userData,
  userDto,
  userLogin,
  userRigistration,
} from "../dtos/user-dtos";
import { SuccesReq } from "../dtos/global-dtos";

interface ManySmsRequests {
  message: "Слишком часто, повторите попытку позже";
  error: {
    type: "ManySmsRequests";
  };
}

interface AuthError {
  message: string;
  error: {
    type: string;
  };
}

@Route("/api")
class UserController {
  /**
   * Регистрация пользователя
   */
  @Response<ManySmsRequests>(400, "ManySmsRequests", {
    message: "Слишком часто, повторите попытку позже",
    error: {
      type: "ManySmsRequests",
    },
  })
  @Tags("user")
  @Post("/registration")
  public async registration(
    @Body() registationData: userRigistration
  ): Promise<succesAuthDto> {
    const userData = await UserService.registration(registationData);
    return userData;
  }

  /*
   * Авторизация пользователя
   */
  @Response<ManySmsRequests>(400, "ManySmsRequests", {
    message: "Слишком часто, повторите попытку позже",
    error: {
      type: "ManySmsRequests",
    },
  })
  @Tags("user")
  @Post("/login")
  public async login(@Body() loginData: userLogin): Promise<succesAuthDto> {
    const userData = await UserService.login(loginData);
    return userData;
  }

  /**
   * Получение новой пары access и refresh токенов<br />
   * Проверка входных данных refresh токена в `запросе`<br />
   * Возвращаемые данные: объект пользователя и пара токенов или сообщение об ошибке, так же токены внутри куки <br />
   */
  @Response<AuthError>(400, "AuthErrors")
  @Tags("user")
  @Get("/refresh")
  public async refreshTokens(
    @Hidden() @Queries() refreshToken: refreshTokens
  ): Promise<succesAuthDto> {
    console.log("refresh");
    const userData = await UserService.refreshTokens(refreshToken.refreshToken);
    return userData;
  }

  /**
   * Получение новой пары access и refresh токенов<br />
   * Проверка входных данных refresh токена в `запросе`<br />
   * Возвращаемые данные: объект пользователя и пара токенов или сообщение об ошибке, так же токены внутри куки <br />
   */
  @Response<AuthError>(400, "AuthErrors")
  @Security("jwt")
  @Tags("user")
  @Post("/logout")
  public async deleteTokens(
    @Hidden() @Body() user: userDto
  ): Promise<SuccesReq> {
    const userData = await UserService.deleteTokens(user);
    return userData;
  }

  /**
   * Получение имени пользователя по ID<br />
   */
  @Response<AuthError>(400, "AuthErrors")
  @Security("jwt")
  @Tags("user")
  @Get("/user")
  public async getUserData(
    @Hidden() @Query() user: userDto = {} as userDto
  ): Promise<userData> {
    const userData = await UserService.getUserData(user);
    return userData;
  }
}

export default UserController;
