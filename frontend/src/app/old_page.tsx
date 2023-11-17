"use client";

import React, { useContext, useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import StoreProvider, { Context } from "@/components/storeProvide";
import { observer } from "mobx-react-lite";
import AddDevice from "@/components/device/addDevice";
import Device from "@/components/device/device";
import DeviceService from "@/services/DeviceService";
import { deviceData } from "@/models/response/DeviceResponse";

function Home() {
  const { store } = useContext(Context);
  const [devices, setDevices] = useState<deviceData[]>([]);

  async function addDevice(newDeviceName: string) {
    await DeviceService.addDevice(newDeviceName);
    await getDevices();
  }

  async function getDevices() {
    const serverDevices = await DeviceService.getDevices();
    // console.log(serverDevices.data);
    setDevices(serverDevices.data.items);
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }

    getDevices();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <StoreProvider>
        <NavBar />

        <div className="w-5/6 h-full">
          {store.isLoading ? (
            <p>Please Wait...</p>
          ) : store.isAuth ? (
            <div className="mt-10 max-w-md flex flex-col gap-y-10 items-start justify-start">
              <p className="text-5xl font-bold">Devices</p>
              {/* <div className="w-full grid grid-cols-3 gap-x-10"> */}
              <div className="w-full flex flex-col gap-y-5">
                {devices.map((dev) => (
                  <Device device={dev} key={dev.id} />
                ))}
                <AddDevice newDevice={addDevice} />
              </div>
            </div>
          ) : (
            <p>АВТОРИЗИРУЙТЕСЬ</p>
          )}
        </div>
      </StoreProvider>
    </main>
  );
}

export default observer(Home);
