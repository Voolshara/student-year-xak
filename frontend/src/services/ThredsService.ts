import { getDevicesResponse } from "@/models/response/DeviceResponse";
import $api from "../http";
import { Project, SuccesReq } from "@/models/response/GlobalRespnose";
import {
  Thread,
  ThreadLoadEdit,
  ThreadsPut,
  userThread,
} from "@/models/global";
import { IUser } from "@/models/IUser";

export default class ThreadService {
  static async getProjects(): Promise<Project[]> {
    const fetchData = $api.get<Project[]>("/projects");
    return (await fetchData).data;
  }

  static async getUsers(): Promise<IUser[]> {
    const fetchData = $api.get<IUser[]>("/users");
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

  static async putThreads(body: ThreadsPut): Promise<SuccesReq> {
    const fetchData = $api.put<SuccesReq>("/thread", body);
    return (await fetchData).data;
  }

  static async getOneThread(thread_id: number): Promise<ThreadLoadEdit> {
    const fetchData = $api.get<ThreadLoadEdit>("/one_thread", {
      params: {
        id: thread_id,
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
