export interface Project {
  id: number;
  title: string;
}

export interface Thred {
  id: number;
  title: string;
  solver: string | undefined;
  tags: string[] | undefined;
}

export interface ThredStructure extends Thred {
  Threds: ThredStructure[] | null;
}

export interface Status {
  type: number;
  num: number | undefined;
}
