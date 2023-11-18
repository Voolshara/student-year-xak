"use client";

import React, { useContext, useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import ProjectELement from "@/components/project";
import StoreProvider, { Context } from "@/components/storeProvide";
import { observer } from "mobx-react-lite";
import { Project } from "@/models/response/GlobalRespnose";
import ThreadService from "@/services/ThredsService";

function Home() {
  const { store } = useContext(Context);
  const [projects, setProjects] = useState<Project[]>([]);
  const [nowProject, setNowProject] = useState<Project>();

  async function fetchProjects() {
    const proj = await ThreadService.getProjects();
    setProjects(proj);
    setNowProject(proj[0]);
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
      fetchProjects();
    } else {
      store.setLoading(false);
    }
  }, []);

  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-start mb-20">
      <StoreProvider>
        <NavBar />

        {store.isLoading ? (
          <p className="text-5xl mt-44">Пожалуйста подождите...</p>
        ) : store.isAuth ? (
          <div className="w-5/6 h-full flex flex-col items-start justify-center gap-y-20 mt-10">
            {/* <p className="text-3xl">
              Привет, <strong>{store.getUserName()}</strong>
            </p> */}

            <div className="w-full h-full flex flex-row items-start justify-between gap-x-10">
              <div className="flex flex-col items-start justify-center w-1/4 ">
                <div className="flex flex-row items-center gap-x-3">
                  <p className="text-2xl font-bold">Проекты</p>
                </div>
                <div className="flex flex-col items-start justify-center ml-7 mt-3 gap-y-4 w-full">
                  {projects.map((pj, index) => (
                    <div
                      key={index}
                      className="flex flex-row gap-x-4 items-center h-6 cursor-pointer"
                      onClick={() => {
                        setNowProject(projects[index]);
                      }}
                    >
                      {nowProject !== undefined && pj.id === nowProject.id ? (
                        <p className="text-xl">●</p>
                      ) : (
                        <p className="w-[12px] text-center">-</p>
                      )}
                      <p className="text-md" key={pj.id}>
                        {pj.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex h-full flex-col items-center justify-center w-full">
                {nowProject !== undefined && (
                  <ProjectELement project={nowProject} />
                )}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-5xl mt-44">Вы не авторизованы</p>
        )}
      </StoreProvider>
    </main>
  );
}

export default observer(Home);
