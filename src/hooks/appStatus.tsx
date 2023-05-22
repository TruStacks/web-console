import React, { useState, createContext } from "react";
import { useContext } from "react";


export type AppStatus = {
  status: string;
  components: { [key: string]: {kind: string, status: string, name: string }}
};

interface AppStatusContextInterface {
  appStatus: AppStatus | null;
  setAppStatus: (value: AppStatus) => void | null;
}

const AppStatusContext = createContext<AppStatusContextInterface | null>(null);

export function AppStatusProvider({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}): JSX.Element {
  const [appStatus, setAppStatus] = useState<AppStatus>({
    status: "",
    components: {}
  });

  return (
    <AppStatusContext.Provider value={{ appStatus, setAppStatus }}>
      {children}
    </AppStatusContext.Provider>
  );
}

export function useAppStatus() {
  const context = useContext(AppStatusContext);
  if (!context) {
    throw new Error(
      "Context is either null or is not within AppStatusProvider"
    );
  }
  return context;
}
