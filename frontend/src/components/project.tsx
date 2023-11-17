import { Project, ThredStructure } from "@/models/global";
import ThredTree from "./ThredTree";

interface Props {
  project: Project;
}

const Threds = [
  {
    id: 2,
    title: "Subtask 1.1",
    solver: "Jane Smith",
    tags: ["Subtask", "Bug"],
    Threds: [
      {
        id: 6,
        title: "Subtask 1.1.1",
        solver: "Bob Johnson",
        tags: ["Subtask", "Feature"],
        Threds: null,
      },
      {
        id: 7,
        title: "Subtask 1.1.2",
        solver: "Alice Brown",
        tags: ["Subtask", "Enhancement"],
        Threds: null,
      },
      {
        id: 8,
        title: "Subtask 1.1.3",
        solver: "Charlie Davis",
        tags: ["Subtask", "Bug"],
        Threds: null,
      },
      {
        id: 9,
        title: "Subtask 1.1.4",
        solver: "Eva Wilson",
        tags: ["Subtask", "Bug"],
        Threds: null,
      },
      {
        id: 10,
        title: "Subtask 1.1.5",
        solver: "David Miller",
        tags: ["Subtask", "Feature"],
        Threds: [
          {
            id: 30,
            title: "Subtask 1.1.5.1",
            solver: "Frank White",
            tags: ["Subtask", "Enhancement"],
            Threds: null,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Subtask 1.2",
    solver: "Frank White",
    tags: ["Subtask", "Enhancement"],
    Threds: null,
  },
  {
    id: 4,
    title: "Subtask 1.3",
    solver: "Grace Taylor",
    tags: ["Subtask", "Bug"],
    Threds: null,
  },
  {
    id: 5,
    title: "Subtask 1.4",
    solver: "Henry Martin",
    tags: ["Subtask", "Feature"],
    Threds: null,
  },
] as ThredStructure[];

export default function ProjectELement({ project }: Props) {
  return (
    <div className="w-full flex flex-col items-start justify-start">
      <ThredTree
        thredData={{
          id: 0,
          title: project.title,
          solver: undefined,
          tags: undefined,
          Threds: Threds,
        }}
        nowLevel={0}
      />
    </div>
  );
}
