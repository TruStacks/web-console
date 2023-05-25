import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { AppStatusProvider } from "../hooks/toolchainState";
import Header from "./Header";

describe("Header", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <AppStatusProvider>
          <Header />
        </AppStatusProvider>
      </MemoryRouter>
    );
  });
  afterEach(() => cleanup());

  test("renders without crashing", async () => {
    const apps = screen.getByText("Applications");
    expect(apps).toBeInTheDocument();
  });
});
