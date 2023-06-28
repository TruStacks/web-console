import React from "react";
import { render, cleanup, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import Home from "./Home";
import { WebSocketEventsProvider } from "../hooks/webSocketEvents";
import { ToolchainStateProvider } from "../hooks/toolchainState";

describe("Home page", () => {
  beforeEach(async () => {
    await waitFor(() => {
      render(
        <MemoryRouter>
          <WebSocketEventsProvider>
            <ToolchainStateProvider>
              <Home />
            </ToolchainStateProvider>
          </WebSocketEventsProvider>
        </MemoryRouter>
      );
    });
  });
  afterEach(() => cleanup());

  test("should render without crashing", async () => {
    const loader = document.getElementsByClassName("loader")[0];
    expect(loader).toBeInTheDocument();
  });
});
