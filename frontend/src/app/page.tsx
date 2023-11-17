"use client";

import React, { useContext, useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import { Project } from "@/models/global";
import ProjectELement from "@/components/project";

const userName = "StanisLove";
const proejcts = [
  { id: 0, title: "Аудио" },
  { id: 1, title: "Видео" },
  { id: 2, title: "Сообщения" },
] as Project[];

function Home() {
  const [nowProject, setNowProject] = useState<Project>(proejcts[0]);

  return (
    <main className="flex w-screen min-h-screen flex-col items-center justify-start">
      <NavBar />

      <div className="w-5/6 h-full flex flex-col items-start justify-center gap-y-20 mt-10">
        <p className="text-3xl">
          Привет, <strong>{userName}</strong>
        </p>

        <div className="w-full h-full flex flex-row items-start justify-between gap-x-10">
          <div className="flex flex-col items-start justify-center w-1/4 ">
            <div className="flex flex-row items-center gap-x-3">
              <p className="text-2xl font-bold">Проекты</p>
            </div>
            <div className="flex flex-col items-start justify-center ml-7 mt-3 gap-y-4 w-full">
              {proejcts.map((projectName, index) => (
                <div
                  key={index}
                  className="flex flex-row gap-x-4 items-center h-6 cursor-pointer"
                  onClick={() => {
                    setNowProject(proejcts[index]);
                  }}
                >
                  {projectName.id === nowProject.id ? (
                    <p className="text-xl">●</p>
                  ) : (
                    <p className="w-[12px] text-center">-</p>
                  )}
                  <p className="text-md" key={projectName.id}>
                    {projectName.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex h-full flex-col items-center justify-center w-3/4 ">
            <ProjectELement project={nowProject} />
          </div>
        </div>
      </div>
    </main>
  );
}

// export default observer(Home);
export default Home;
