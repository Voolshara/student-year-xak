import { IUser } from "./IUser";

export interface Status {
  type: number;
  num: number | undefined;
}

export interface Report {
  id: number;
  url: string;
}

export interface Thread {
  id: number;
  creation_date: Date;
  solver: IUser | null;
  creator: IUser;
  title: string;
  comment: string | undefined;
  state_done: number;
  state_error: number;
  state_none: number;
  state_skip: number;
  tag: string[];
  childThreads: Thread[];
  parent_id: number | undefined;
  reports: Report[];
}
