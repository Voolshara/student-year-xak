import { Thread } from "@/models/global";
import ThredTree from "./ThredTree";
import { Project } from "@/models/response/GlobalRespnose";
import { useEffect, useState } from "react";
import ThreadService from "@/services/ThredsService";

interface Props {
  project: Project;
}

export default function ProjectELement({ project }: Props) {
  const [thread, setTread] = useState<Thread>();

  useEffect(() => {
    fetchThreads();
  }, [project]);

  async function fetchThreads() {
    const thread = await ThreadService.getThreads(project.id);
    // console.log(thread);
    setTread(thread);
  }

  return (
    <div className="w-full flex flex-col items-start justify-start">
      {thread !== undefined && <ThredTree thredData={thread} nowLevel={0} />}
    </div>
  );
}
