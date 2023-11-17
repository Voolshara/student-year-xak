import { Reports } from "@prisma/client";
import { user } from "./user-dtos";

// Request

export interface ThreadsGet {
  proj_id: number;
}

export interface ThreadsCreate {
  title: string;
  comment: string;
  tag: string[];
  parent_id: number | null;
}

export interface ThreadsEdit extends ThreadsCreate {
  id: number;
}

export interface ThreadsPut extends ThreadsCreate {
  id: number | undefined;
}

// -----------------

// Response
export interface Project {
  id: number;
  title: string;
}

export interface Report {
  id: number;
  url: string;
}

export interface Thread {
  id: number;
  creation_date: Date;
  solver: user | null;
  creator: user;
  title: string;
  comment: string | undefined;
  state_done: number;
  state_error: number;
  state_none: number;
  state_skip: number;
  tag: string[];
  childThreads: Thread[];
  parent_id: number | undefined;
  reports: Reports[];
}

export interface getThreads {}