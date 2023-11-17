import { Project, ThredStructure } from "@/models/global";
import ThredTree from "./ThredTree";

interface Props {
  project: Project;
}

const Threds = [
  {
    id: 2,
    title: "Child Element 1.1",
    solver: 102,
    tag: "Subcategory",
    Threds: [
      {
        id: 6,
        title: "Child Element 1.1.1",
        solver: 106,
        tag: "Topic",
        Threds: null,
      },
      {
        id: 7,
        title: "Child Element 1.1.2",
        solver: 107,
        tag: "Topic",
        Threds: null,
      },
      {
        id: 8,
        title: "Child Element 1.1.3",
        solver: 108,
        tag: "Topic",
        Threds: null,
      },
      {
        id: 9,
        title: "Child Element 1.1.4",
        solver: 109,
        tag: "Topic",
        Threds: null,
      },
      {
        id: 10,
        title: "Child Element 1.1.5",
        solver: 110,
        tag: "Topic",
        Threds: null,
      },
    ],
  },
  {
    id: 3,
    title: "Child Element 1.2",
    solver: 103,
    tag: "Subcategory",
    Threds: null,
  },
  {
    id: 4,
    title: "Child Element 1.3",
    solver: 104,
    tag: "Subcategory",
    Threds: null,
  },
  {
    id: 5,
    title: "Child Element 1.4",
    solver: 105,
    tag: "Subcategory",
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
          tag: undefined,
          Threds: Threds,
        }}
        nowLevel={0}
      />
    </div>
  );
}
