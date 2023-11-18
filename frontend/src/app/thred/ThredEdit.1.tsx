"use client";
import NavBar from "@/components/NavBar";
import Link from "next/link";
import { useContext, useEffect } from "react";
import StoreProvider, { Context } from "@/components/storeProvide";

export function ThredEdit() {
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-start mb-20">
      <StoreProvider>
        <NavBar />

        <div className="w-11/12 bg-white z-30 p-10 pt-20 rounded-xl flex flex-col gap-y-5 items-start justify-center">
          <p className="font-bold text-3xl mb-12">Вас здесь не должно быть )</p>
          <Link
            href={"/"}
            className="flex flex-row gap-x-5 border-black border-2 rounded-xl px-3 py-2 hover:bg-black hover:text-white"
          >
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
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
            Вернуться
          </Link>
        </div>
      </StoreProvider>
    </main>
  );
}
