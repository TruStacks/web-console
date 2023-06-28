import React, { useState, useContext, createContext } from "react";

export type WebSocketEventsContextType = {
  messages: MessageEvent[] | undefined;
}

const WebSocketEventsContext = createContext<WebSocketEventsContextType | null>(
  null
);

export function WebSocketEventsProvider({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const [messages, setMessages] = useState<MessageEvent[]>();
  const socket = new WebSocket(
    "wss://ts-controller.tc.trustacks.io/notifications"
  );
  socket.onmessage = (e) => {
    if (messages && messages.length > 0) {
      setMessages([e, ...messages]);
    } else {
      setMessages([e]);
    }
  };

  return (
    <WebSocketEventsContext.Provider value={{ messages }}>
      {children}
    </WebSocketEventsContext.Provider>
  );
}

export function useWebSocketEvents() {
  const context = useContext(WebSocketEventsContext);
  if (!context) {
    throw new Error(
      "WebSocket Events are either null or not within WebSocketEventsProvider"
    );
  } else {
    return context;
  }
}
