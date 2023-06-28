import React, { useState, useContext, createContext, useEffect } from "react";
import { getToolchainInfo } from "../modules/apiRequests";
import { useWebSocketEvents } from "./webSocketEvents";

export type ToolchainState = {
  status: string;
  deployKey: string;
  components: {
    [key: string]: {
      kind: string;
      status: string;
      name: string;
    };
  };
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
  const { messages } = useWebSocketEvents();
  const [toolchainState, setToolchainState] = useState<ToolchainState>({
    status: "loading",
    deployKey: "",
    components: {},
  });

  // fetch request for Toolchain data
  const updateToolchainState = async () => {
    const res = await getToolchainInfo();
    if (res.result) setToolchainState(res.result);
    else console.error(res);
  };

  // Initial page load
  useEffect(() => {
    updateToolchainState();
  }, []);

  // Websocket notifications
  useEffect(() => {
    if (messages && messages[0] !== null) {
      const event = JSON.parse(messages[0].data);
      console.log(event);
      switch (event.type) {
        // refresh toolchain info
        case "io.trustacks.pipeline.ProgressNextEvent":
        case "io.trustacks.toolchain.StatusChangeEvent":
        case "io.trustacks.toolchain.ComponentStatusChangeEvent":
          updateToolchainState();
          break;
      }
    }
  }, [messages]);

  return (
    <ToolchainStateContext.Provider
      value={{ toolchainState, setToolchainState }}
    >
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
