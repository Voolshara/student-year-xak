import { useState } from "react";

interface props {
  newDevice: Function;
}

export default function AddDevice({ newDevice }: props) {
  const [deviceName, setDeviceName] = useState<string>("");

  async function sendDevice() {
    if (deviceName !== "") await newDevice(deviceName);
  }

  return (
    <div className="w-full border-dashed border-gray-500 border-2 p-6 rounded-xl">
      <div className="flex flex-col gap-y-5">
        {deviceName !== "" ? (
          <p className="text-xl font-bold">Add Device</p>
        ) : (
          <></>
        )}

        <div className="flex flex-row gap-x-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <input
            className="w-full border-b-2 border-gray-400 focus:outline-none"
            type="text"
            value={deviceName}
            onChange={(e) => {
              setDeviceName(e.target.value);
            }}
            onBlur={async () => {
              await sendDevice();
              setDeviceName("");
            }}
            onKeyDown={async (e) => {
              if (e.key === "Enter") {
                await sendDevice();
                setDeviceName("");
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
