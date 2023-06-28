import React from "react"

import Applications from "./Applications"
import { cleanup, render } from "@testing-library/react"

describe("Applications page", () => {
  beforeEach(() => {
    render((
      <Applications />
    ))
  })
  afterEach(() => cleanup())

  test("should render without crashing", () => {
    const testElement = document.querySelector(".application")
    expect(testElement).toBeInTheDocument()
  })
})