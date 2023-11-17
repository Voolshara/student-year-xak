export interface userDto {
  userId: number;
  link: string;
  isAdmin: boolean;
}

export interface userRigistration {
  userName: string;
  login: string;
  password: string;
}

export interface userLogin {
  login: string;
  password: string;
}

export interface refreshTokens {
  refreshToken: string;
}

// Response

export interface succesAuthDto {
  user: userDto;
  accessToken: string;
  refreshToken: string;
}

export interface userData {
  userName: string;
}

export interface user {
  id: number;
  link: string;
  isAdmin: boolean;
}
