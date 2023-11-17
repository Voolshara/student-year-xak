"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import StoreProvider, { Context } from "@/components/storeProvide";
import { observer } from "mobx-react-lite";

function Login() {
  const { store } = useContext(Context);

  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { push } = useRouter();

  return (
    <StoreProvider>
      <div className="flex flex-col gap-y-16 items-center justify-center min-h-screen min-w-screen">
        <p className="text-5xl uppercase">Sign In</p>
        <div className="flex flex-col gap-y-8">
          <label className="flex flex-row gap-x-4">
            <p className="w-16 text-right">Login</p>
            <input
              type="text"
              className="border-b-2 border-black focus:outline-none"
              value={login}
              onChange={(e) => {
                setLogin(e.target.value);
              }}
            />
          </label>
          <label className="flex flex-row gap-x-4">
            <p className="w-16 text-right">Password</p>
            <input
              type="password"
              className="border-b-2 border-black focus:outline-none"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
        </div>
        <p
          onClick={async () => {
            await store.login(login, password);
            push("/");
          }}
          className="rounded-xl border-2 border-black px-6 py-1 hover:text-white hover:bg-black"
        >
          Join
        </p>
      </div>
    </StoreProvider>
  );
}

export default observer(Login);
