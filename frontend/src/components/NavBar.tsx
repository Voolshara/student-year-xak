import React, { useContext } from "react";
import Link from "next/link";
import { Context } from "./storeProvide";
import { observer } from "mobx-react-lite";

function NavBar() {
  const { store } = useContext(Context);

  if (!store.isAuth)
    return (
      <div className="w-11/12 flex flex-row justify-end items-center px-10 py-5 border-b-2 border-black top-0 gap-x-10">
        <Link href="/login" className=" text-black font-bold text-xl">
          Sign In
        </Link>
        <Link
          href="/registration"
          className="p-2 border-2 border-black bg-black text-white hover:bg-white hover:text-black rounded-2xl font-bold text-xl"
        >
          Sign Up
        </Link>
      </div>
    );

  return (
    <div className="w-11/12 flex flex-row justify-end items-center px-10 py-5 border-b-2 border-black top-0 gap-x-10">
      <p className=" text-black font-bold text-xl">
        Welcome, {store.getUserName()}
      </p>
      <p
        className="p-2 border-2 border-black bg-black text-white hover:bg-white hover:text-black rounded-2xl font-bold text-xl"
        onClick={async () => {
          await store.logout();
        }}
      >
        Log Out
      </p>
    </div>
  );
}

export default observer(NavBar);
