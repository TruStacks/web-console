import React, { useState, createContext, useEffect } from "react";
import { useContext } from "react";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { getToolchainInfo } from "../modules/apiRequests";

export type ToolchainState = {
  status: string;
  components: { [key: string]: { kind: string; status: string; name: string } };
};

interface ToolchainStateContextInterface {
  toolchainState: ToolchainState | null;
  setToolchainState: (value: ToolchainState) => void | null;
}

const ToolchainStateContext = createContext<ToolchainStateContextInterface | null>(
  null
);

export function ToolchainStateProvider({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}): JSX.Element {
  const [toolchainState, setToolchainState] = useState<ToolchainState>({
    status: "initializing",
    components: {},
  });
  const { lastMessage } = useWebSocket(
    "wss://ts-controller.tc.trustacks.io/notifications"
  );

  // fetch request for Toolchain data
  const updateToolchainState = async () => {
    const res = await getToolchainInfo();
    if (res.result) {
      setToolchainState(res.result);
    } else {
      console.error(res);
    }
  };

  // Initial page load
  useEffect(() => {
    updateToolchainState();
  }, []);

  // Websocket notifications
  useEffect(() => {
    if (lastMessage !== null) {
      const event = JSON.parse(lastMessage.data);
      if (
        event.type === "io.trustacks.pipeline.ProgressNextEvent" ||
        event.type === "io.trustacks.toolchain.StatusChangeEvent" ||
        event.type === "io.trustacks.toolchain.ComponentStatusChangeEvent"
      ) {
        updateToolchainState();
      }
    }
  }, [lastMessage]);

  return (
    <ToolchainStateContext.Provider value={{ toolchainState, setToolchainState }}>
      {children}
    </ToolchainStateContext.Provider>
  );
}

export function useToolchainState() {
  const context = useContext(ToolchainStateContext);
  if (!context) {
    throw new Error(
      "Context is either null or is not within ToolchainStateProvider"
    );
  }
  return context;
}
