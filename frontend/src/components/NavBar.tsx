import React, { useContext } from "react";
import Link from "next/link";
import { Context } from "./storeProvide";
import { observer } from "mobx-react-lite";

function NavBar() {
  const { store } = useContext(Context);

  if (!store.isAuth)
    return (
      <div className="w-11/12 flex flex-row justify-between items-center px-10 py-5 border-b-2 border-black top-0 gap-x-10">
        <Link href="/" className=" text-black font-bold text-3xl">
          TaskTracker
        </Link>
        <div className="flex flex-row gap-x-10 items-center">
          <Link href="/login" className=" text-black font-bold text-xl">
            Вход
          </Link>
          <Link
            href="/registration"
            className="p-2 border-2 border-black bg-black text-white hover:bg-white hover:text-black rounded-2xl font-bold text-xl"
          >
            Регистрация
          </Link>
        </div>
      </div>
    );

  return (
    <div className="w-11/12 flex flex-row justify-between items-center px-10 py-5 border-b-2 border-black top-0 gap-x-10">
      <Link href="/" className=" text-black font-bold text-3xl">
        TaskTracker
      </Link>
      <div className="flex flex-row gap-x-10 items-center">
        <p className=" text-black font-bold text-xl">
          Привет, {store.getUserName()}
        </p>
        <p
          className="p-2 border-2 border-black bg-black text-white hover:bg-white hover:text-black rounded-2xl font-bold text-xl"
          onClick={async () => {
            await store.logout();
          }}
        >
          Выйти
        </p>
      </div>
    </div>
  );
}

export default observer(NavBar);
