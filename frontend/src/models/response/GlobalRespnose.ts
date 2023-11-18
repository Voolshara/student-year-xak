export interface AuthError {
  message: string;
  error: {
    type: string;
  };
}

export interface SuccesReq {
  message: "success";
}

export interface Project {
  id: number;
  title: string;
}
