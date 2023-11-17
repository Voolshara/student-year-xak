import { Thred } from "@/models/global";

interface Props {
  thredData: Thred;
}

export default function ThredElement({ thredData }: Props) {
  return <div>{thredData.title}</div>;
}
