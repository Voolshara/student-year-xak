import React, { ReactNode, createContext, useContext } from "react";
import Store from "@/store/store";

export interface State {
  store: Store;
}

const store = new Store();

export const Context = createContext<State>({
  store,
});

type Props = {
  children: ReactNode;
};

export default function StoreProvider({ children }: Props) {
  return <Context.Provider value={{ store }}>{children}</Context.Provider>;
}
