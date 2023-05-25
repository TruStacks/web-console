import React from "react";
import { screen, render, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Home from "./Home";
import { AppStatusProvider } from "../hooks/toolchainState";

describe("Home page", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <AppStatusProvider>
          <Home />
        </AppStatusProvider>
      </MemoryRouter>
    );
  });
  afterEach(() => cleanup());

  test("should render without crashing", async () => {
    const loader= document.getElementsByClassName("loader")[0]
    expect(loader).toBeInTheDocument()
  });
});
