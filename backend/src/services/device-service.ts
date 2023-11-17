import { PrismaClient } from "@prisma/client";

import { userDto } from "../dtos/user-dtos";
import { SuccesReq } from "../dtos/global-dtos";
import { addDevice, getDevices } from "../dtos/device-dtos";

import ApiError from "../exceptions/api-error";

const prisma = new PrismaClient();

class DeviceService {
  async addDevice(deviceData: addDevice, user: userDto): Promise<SuccesReq> {
    await prisma.user.update({
      where: {
        id: user.userId,
      },
      data: {
        Devices: {
          create: {
            name: deviceData.deviceName,
          },
        },
      },
    });

    return {
      message: "success",
    };
  }

  async getDevices(user: userDto): Promise<getDevices> {
    const devices = await prisma.devices.findMany({
      where: {
        user: {
          id: user.userId,
        },
      },
      orderBy: {
        id: "asc",
      },
    });

    return { items: devices.map((dev) => ({ id: dev.id, name: dev.name })) };
  }
}

export default new DeviceService();
