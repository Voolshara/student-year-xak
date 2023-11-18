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
  Put,
  Query,
} from "tsoa";
import { userDto } from "../dtos/user-dtos";
import { SuccesReq } from "../dtos/global-dtos";
import {
  Project,
  Thread,
  ThreadsEdit,
  ThreadsGet,
  ThreadsPut,
} from "../dtos/Thread-dtos";
import threadsService from "../services/threads-service";

interface AuthError {
  message: string;
  error: {
    type: string;
  };
}

@Route("/api")
class ThreadController {
  /**
   * Получение Проектов<br />
   */
  @Response<AuthError>(400, "AuthErrors")
  @Security("jwt")
  @Tags("Threads")
  @Get("/users")
  public async getUsers(
    @Hidden() @Query() user: userDto = {} as userDto
  ): Promise<userDto[]> {
    const response = await threadsService.getUsers(user);
    return response;
  }
  /**
   * Получение Проектов<br />
   */
  @Response<AuthError>(400, "AuthErrors")
  @Security("jwt")
  @Tags("Threads")
  @Get("/projects")
  public async getProjects(
    @Hidden() @Query() user: userDto = {} as userDto
  ): Promise<Project[]> {
    const response = await threadsService.getProjects(user);
    return response;
  }

  /**
   * Добавление / Изменение тредов<br />
   */
  @Response<AuthError>(400, "AuthErrors")
  @Security("jwt")
  @Tags("Threads")
  @Put("/thread")
  public async addThread(
    @Body() threadData: ThreadsPut,
    @Hidden() @Query() user: userDto = {} as userDto
  ): Promise<SuccesReq> {
    let response;
    if (threadData.id !== undefined) {
      response = await threadsService.editThread(
        threadData as ThreadsEdit,
        user
      );
      return response;
    } else {
      response = await threadsService.addThread(threadData, user);
    }
    return response;
  }

  /**
   * Получение тредов<br />
   */
  @Response<AuthError>(400, "AuthErrors")
  @Security("jwt")
  @Tags("Threads")
  @Get("/thread")
  public async getThreads(
    @Queries() query: ThreadsGet,
    @Hidden() @Query() user: userDto = {} as userDto
  ): Promise<Thread> {
    const response = await threadsService.getDevices(query.proj_id, user);
    // console.log(response);
    return response;
  }
}

export default ThreadController;
