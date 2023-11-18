import { getDevicesResponse } from "@/models/response/DeviceResponse";
import $api from "../http";
import { Project, SuccesReq } from "@/models/response/GlobalRespnose";
import { Thread } from "@/models/global";

export default class ThreadService {
  static async getProjects(): Promise<Project[]> {
    const fetchData = $api.get<Project[]>("/projects");
    return (await fetchData).data;
  }

  static async getThreads(proj_id: number | null): Promise<Thread> {
    const fetchData = $api.get<Thread>("/thread", {
      params: {
        proj_id: proj_id,
      },
    });
    return (await fetchData).data;
  }

  // static async addDevice(
  //   deviceName: string
  // ): Promise<AxiosResponse<SuccesReq>> {
  //   return $api.put<SuccesReq>("/device", { deviceName });
  // }

  // static async getDevices(): Promise<AxiosResponse<getDevicesResponse>> {
  //   return $api.get<getDevicesResponse>("/device");
  // }
}
