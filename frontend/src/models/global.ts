export interface Project {
  id: number;
  title: string;
}

export interface Thred {
  id: number;
  title: string;
  solver: number | undefined;
  tag: string | undefined;
}

export interface ThredStructure extends Thred {
  Threds: ThredStructure[] | null;
}
