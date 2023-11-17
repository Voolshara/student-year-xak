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
import { addDevice, getDevices } from "../dtos/device-dtos";
import deviceService from "../services/device-service";

interface AuthError {
  message: string;
  error: {
    type: string;
  };
}

@Route("/api")
class DeiviceController {
  /**
   * Добавление девайса<br />
   */
  @Response<AuthError>(400, "AuthErrors")
  @Security("jwt")
  @Tags("Device")
  @Put("/device")
  public async addDevice(
    @Body() deviceData: addDevice,
    @Hidden() @Query() user: userDto = {} as userDto
  ): Promise<SuccesReq> {
    const response = await deviceService.addDevice(deviceData, user);
    return response;
  }

  /**
   * Получение девайсов<br />
   */
  @Response<AuthError>(400, "AuthErrors")
  @Security("jwt")
  @Tags("Device")
  @Get("/device")
  public async getDevices(
    @Hidden() @Query() user: userDto = {} as userDto
  ): Promise<getDevices> {
    const response = await deviceService.getDevices(user);
    // console.log(response);
    return response;
  }
}

export default DeiviceController;
