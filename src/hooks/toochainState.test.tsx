import { screen, render, cleanup, waitFor } from "@testing-library/react";
import React, { useContext, useState, createContext } from "react";

import { useToolchainState, ToolchainStateProvider } from "./toolchainState";
import {
  WebSocketEventsContextType,
  WebSocketEventsProvider,
} from "./webSocketEvents";

jest.mock("../modules/apiRequests", () => {
  return {
    getToolchainInfo: jest.fn(() => {
      return { result: true };
    }),
  };
});

// jest.mock("./webSocketEvents", () => {
//   const mockMessage = new MessageEvent("test", { data: { type: "test" } });
//   const [mockMessages] = useState([mockMessage]);
//   const MockContext = createContext<WebSocketEventsContextType | null>(null);
//   return {
//     useWebSocketEvents: () => useContext(MockContext),
//     WebSocketEventsProvider: () => {
//       return (
//         <MockContext.Provider
//           value={{ messages: mockMessages }}
//         ></MockContext.Provider>
//       );
//     },
//   };
// });

function TestComponent() {
  const { toolchainState } = useToolchainState();
  return (
    <div>
      <ToolchainStateProvider>
        <p>{toolchainState?.status}</p>
        <p>{JSON.stringify(toolchainState?.components)}</p>
      </ToolchainStateProvider>
    </div>
  );
}

beforeEach(() => {
  waitFor(() => {
    render(
      <WebSocketEventsProvider>
        <ToolchainStateProvider>
          <TestComponent />
        </ToolchainStateProvider>
      </WebSocketEventsProvider>
    );
  });
});

afterEach(cleanup);

describe("toolchainState", () => {
  test('initiates with status of "initializing" and components as {}', async () => {
    expect(screen.getByText("loading")).toBeInTheDocument();
    expect(screen.getByText("{}")).toBeInTheDocument();
  });

  // test('updates with new status', async () => {
  //   await waitFor(() => {
  //   })
  //   screen.debug()
  //   expect(true).toBe(true)
  // })
});
