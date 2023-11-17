import { getDevicesResponse } from "@/models/response/DeviceResponse";
import $api from "../http";
import { AxiosResponse } from "axios";
import { SuccesReq } from "@/models/response/GlobalRespnose";

export default class DeviceService {
  static async addDevice(
    deviceName: string
  ): Promise<AxiosResponse<SuccesReq>> {
    return $api.put<SuccesReq>("/device", { deviceName });
  }

  static async getDevices(): Promise<AxiosResponse<getDevicesResponse>> {
    return $api.get<getDevicesResponse>("/device");
  }
}
