import { deviceData } from "@/models/response/DeviceResponse";

interface deviceProps {
  device: deviceData;
}

export default function Device({ device }: deviceProps) {
  return (
    <div className="w-full flex flex-row gap-x-5 border-dashed border-gray-500 border-2 p-6 rounded-xl">
      Device: <p className="font-bold">{device.name}</p>
    </div>
  );
}
