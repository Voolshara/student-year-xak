"use client";

import NavBar from "@/components/NavBar";
import { useState } from "react";
import Link from "next/link";
import ThredStatus from "@/components/status";
import StoreProvider, { Context } from "@/components/storeProvide";
import { observer } from "mobx-react-lite";
import { useEffect, useContext } from "react";
import ThreadService from "@/services/ThredsService";
import { IUser } from "@/models/IUser";

interface Props {
  params: {
    thred_id: string[];
  };
}

function ThredEdit({ params }: Props) {
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  const [tags, setTags] = useState<string[]>([]);

  const [isSaved, setIsSaved] = useState<boolean>(true);
  const [title, setTitle] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [solver, setSolver] = useState<number>();
  const [tagName, setTagName] = useState<string>("");
  const [nowStatus, setNowStatus] = useState<number>(-1);

  const [isNew, setIsNew] = useState<boolean>(false);
  const [thread_id, setThread_id] = useState<string>(params.thred_id[1]);

  const [users, setUsers] = useState<IUser[]>();

  async function fetchData() {
    const users = await ThreadService.getUsers();

    if (params.thred_id[0] !== "-1") {
      const threadData = await ThreadService.getOneThread(
        parseInt(params.thred_id[0])
      );
      setTags(threadData.tag);
      setTitle(threadData.title);
      if (threadData.comment !== undefined) setComment(threadData.comment);
      setSolver(threadData.solver?.id);
      // setNowStatus(threadData.now_status);
    }
    setUsers(users);
  }

  useEffect(() => {
    if (params.thred_id[0] === "-1") setIsNew(true);
    fetchData();
  }, []);

  function save() {
    if (isNew) {
      ThreadService.putThreads({
        id: undefined,
        nowStatus: nowStatus,
        comment: comment,
        parent_id: thread_id === "undefined" ? null : parseInt(thread_id),
        solver_id: solver,
        tag: tags,
        title: title,
      });
    } else {
      ThreadService.putThreads({
        id: parseInt(params.thred_id[0]),
        nowStatus: nowStatus,
        comment: comment,
        parent_id: thread_id === "undefined" ? null : parseInt(thread_id),
        solver_id: solver,
        tag: tags,
        title: title,
      });
    }
  }

  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-start mb-20">
      <StoreProvider>
        <NavBar />

        <div className="w-11/12 bg-white z-30 p-10 pt-20 rounded-xl flex flex-col gap-y-5 items-start justify-center">
          {isNew ? (
            <p className="font-bold text-3xl mb-12">Создание задачи: {title}</p>
          ) : (
            <p className="font-bold text-3xl mb-12">
              Изменение Задачи: {title}
            </p>
          )}

          <div className="ml-10 flex flex-col gap-y-10">
            <div className="flex flex-col gap-y-3">
              {!isSaved ? (
                <p className="font-bold text-red-600">Сохранитесь !</p>
              ) : (
                <p></p>
              )}

              <p className="text-xl">Название:</p>
              <input
                type="text"
                className="border-b-2 border-black focus:outline-none"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setIsSaved(false);
                }}
              />
            </div>

            <div className="flex flex-col gap-y-3">
              <p className="text-xl">Комментарий:</p>
              <input
                type="text"
                className="border-b-2 border-black focus:outline-none"
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                  setIsSaved(false);
                }}
              />
            </div>

            <div className="flex flex-col gap-y-3">
              <p className="text-xl">Ответственный:</p>
              <div className="flex flex-row gap-x-2">
                {users?.map((u, index) =>
                  u.userId === solver ? (
                    <p
                      onClick={() => {
                        setSolver(u.userId);
                        setIsSaved(false);
                      }}
                      key={index}
                      className="px-3 py-1 cursor-pointer border-gray-800 border-2 rounded-xl bg-gray-800 text-white"
                    >
                      {u.link}
                    </p>
                  ) : (
                    <p
                      onClick={() => {
                        setSolver(u.userId);
                        setIsSaved(false);
                      }}
                      key={index}
                      className="px-3 py-1 cursor-pointer border-gray-500 border-2 rounded-xl"
                    >
                      {u.link}
                    </p>
                  )
                )}
              </div>
              {/* <input
                type="text"
                className="border-b-2 border-black focus:outline-none"
                value={solver}
                onChange={(e) => {
                  setSolver(e.target.value);
                  setIsSaved(false);
                }}
              /> */}
            </div>

            <div className="flex flex-col gap-y-3">
              <p className="text-xl">Тэги:</p>
              <input
                type="text"
                className="border-b-2 mb-5 border-black focus:outline-none"
                value={tagName}
                onChange={(e) => {
                  setTagName(e.target.value);
                  setIsSaved(false);
                }}
                onBlur={async () => {
                  if (tagName !== "") {
                    setTags((tags) => [...tags, tagName]);
                    setTagName("");
                  }
                }}
                onKeyDown={async (e) => {
                  if (e.key === "Enter" && tagName !== "") {
                    setTags((tags) => [...tags, tagName]);
                    setTagName("");
                  }
                }}
              />
              <div className="flex flex-row gap-x-3">
                {tags.map((tag, index) => (
                  <div
                    className="w-fit bg-white py px-2  border-2  rounded-xl hover:bg-red-400 hover:border-red-400 hover:cursor-pointer"
                    key={index}
                    onClick={() => {
                      setTags((prevItems) => {
                        // Create a new array excluding the element at the specified index
                        return prevItems.filter((_, ind) => ind !== index);
                      });
                    }}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-row gap-x-10 items-center">
              <p className="text-xl">Cтатус: </p>

              <div className="flex flex-row justify-start items-center gap-x-10">
                {Array.from({ length: 4 }, (x, i) => i).map((index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setNowStatus(index);
                      setIsSaved(false);
                    }}
                  >
                    {index === nowStatus ? (
                      <div className="p-2 border border-gray-700 rounded-xl">
                        <ThredStatus
                          status={{
                            type: index,
                            num: undefined,
                          }}
                        />
                      </div>
                    ) : (
                      <div className="p-2 border border-white">
                        <ThredStatus
                          status={{
                            type: index,
                            num: undefined,
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-row gap-x-10 items-center justify-between">
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
              <button
                onClick={() => {
                  setIsSaved(true);
                }}
                className="border-black border-2 rounded-xl px-3 py-2 hover:bg-red-600 hover:border-red-600"
              >
                Удалить задачу
              </button>
              <button
                onClick={() => {
                  setIsSaved(true);
                  save();
                }}
                className="border-black border-2 rounded-xl px-3 py-2 hover:bg-black hover:text-white"
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </StoreProvider>
    </main>
  );
}

export default observer(ThredEdit);
