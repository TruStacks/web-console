import React from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { WebSocketEventsProvider } from "../hooks/webSocketEvents";
import { ToolchainStateProvider } from "../hooks/toolchainState";
import Header from "./Header";

describe("Header", () => {
  beforeEach(() => {
    waitFor(() => {
      render(
        <MemoryRouter>
          <WebSocketEventsProvider>
            <ToolchainStateProvider>
              <Header />
            </ToolchainStateProvider>
          </WebSocketEventsProvider>
        </MemoryRouter>
      );
    });
  });
  afterEach(() => cleanup());

  test("renders without crashing", async () => {
    const apps = screen.getByText("Applications");
    expect(apps).toBeInTheDocument();
  });
});
