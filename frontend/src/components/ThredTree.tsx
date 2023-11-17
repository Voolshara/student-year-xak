import { ThredStructure } from "@/models/global";
import { useState } from "react";
import ThredElement from "./Thred";

interface Props {
  thredData: ThredStructure;
  nowLevel: number;
}

export default function ThredTree({ thredData, nowLevel }: Props) {
  const [isClosed, setCloseState] = useState<boolean>(
    thredData.Threds !== null
    // false
  );

  return (
    <div className="flex flex-col w-full">
      <div
        className="flex flex-row gap-x-4 items-center py-3"
        onClick={() => {
          if (thredData.Threds !== null) setCloseState(!isClosed);
        }}
      >
        {Array.from({ length: nowLevel }, (x, i) => i).map((i) => (
          <div key={i} className="text-gray-400 w-[22px] text-center h-full">
            |
          </div>
        ))}
        {thredData.Threds !== null ? (
          !isClosed ? (
            <svg height="22" width="22" className="cursor-pointer">
              <circle
                cx="11"
                cy="11"
                r="10"
                stroke="black"
                strokeWidth={2}
                fill="none"
              />
            </svg>
          ) : (
            <svg height="22" width="22" className="cursor-pointer">
              <circle
                cx="11"
                cy="11"
                r="10"
                stroke="black"
                strokeWidth={2}
                // fill="none"
              />
            </svg>
          )
        ) : !isClosed ? (
          <svg height="22" width="22">
            <circle
              cx="11"
              cy="11"
              r="10"
              stroke="black"
              strokeWidth={2}
              fill="none"
            />
          </svg>
        ) : (
          <svg height="22" width="22">
            <circle
              cx="11"
              cy="11"
              r="10"
              stroke="black"
              strokeWidth={2}
              // fill="none"
            />
          </svg>
        )}

        <ThredElement
          thredData={thredData}
          nowLevel={nowLevel}
          isLast={thredData.Threds === null}
        />
      </div>

      {!isClosed && thredData.Threds !== null ? (
        thredData.Threds.map((th) => (
          <ThredTree key={th.id} nowLevel={nowLevel + 1} thredData={th} />
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
}
