import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import AuthService from "../services/AuthService";
import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { API_URL } from "../http";

export default class Store {
  user = {} as IUser;
  isAuth = false;
  isLoading = true;

  constructor() {
    makeAutoObservable(this);
  }

  getUserName() {
    return this.user.link;
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  async login(login: string, password: string) {
    try {
      const response = await AuthService.login(login, password);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (err) {
      let errorMessage = "";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      console.log(errorMessage);
    }
  }

  async registration(userName: string, login: string, password: string) {
    try {
      const response = await AuthService.registration(
        userName,
        login,
        password
      );
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (err) {
      let errorMessage = "";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      console.log(errorMessage);
    }
  }

  async logout() {
    try {
      const response = await AuthService.logout();
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (err) {
      let errorMessage = "";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      console.log(errorMessage);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (err) {
      let errorMessage = "";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      console.log(errorMessage);
    } finally {
      this.setLoading(false);
    }
  }
}
