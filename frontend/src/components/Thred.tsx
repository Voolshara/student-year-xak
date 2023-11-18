import { Status, Thread } from "@/models/global";
import ThredStatus from "./status";
import { useRouter } from "next/navigation";

interface Props {
  thredData: Thread;
  nowLevel: number;
  isLast: boolean;
}

const Statuses = [
  { type: 0, num: 29 },
  { type: 1, num: 13 },
  { type: 3, num: 35 },
  { type: 2, num: 44 },
] as Status[];

export default function ThredElement({ thredData, nowLevel, isLast }: Props) {
  const { push } = useRouter();

  return (
    <div className="relative py-2 px-4 rounded-xl flex flex-row items-start border border-gray-500 justify-center gap-x-5 overflow-y-hidden">
      {Array.from({ length: nowLevel }, (x, i) => i).map((i) => (
        <div
          key={i}
          className="w-full h-full py-10 px-4 absolute rounded-xl -top-2 bg-gray-800 bg-opacity-5"
        ></div>
      ))}

      <div className="z-10  flex flex-col gap-y-1">
        <div className="flex flex-row gap-x-10 items-center">
          <p
            className="text-md font-bold ml-1 cursor-pointer"
            onClick={() => {
              push(`/thred/${thredData.id}`);
            }}
          >
            {thredData.title}
          </p>
          <p className="italic mr-5">{thredData.solver?.link}</p>
        </div>

        <div className="z-10  flex flex-row items-start gap-2">
          {thredData.tag.map((tag, index) => (
            <div
              className="w-fit bg-white py px-2  border-2  rounded-xl"
              key={index}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>

      <div className="z-10 flex flex-row gap-x-1 self-center">
        {isLast ? (
          <ThredStatus
            status={{
              num: undefined,
              type: 3,
            }}
          />
        ) : (
          Statuses.map((status, index) => (
            <ThredStatus status={status} key={index} />
          ))
        )}
      </div>
    </div>
  );
}
