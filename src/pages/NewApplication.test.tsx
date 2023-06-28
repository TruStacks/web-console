import React from "react";
import userEvent from "@testing-library/user-event";
import { cleanup, render, screen } from "@testing-library/react";

import NewApplication from "./NewApplication";
import {newApplication} from "../modules/apiRequests";

jest.mock("../modules/apiRequests", () => {
  return {
    newApplication: jest.fn(() => "asdf"),
  };
});

describe("NewApplication form component", () => {
  beforeEach(() => {
    render(<NewApplication />);
  });

  afterEach(() => cleanup());

  test("should render without crashing", async () => {
    const workflow = await screen.findByText("Workflow", { exact: false });
    expect(workflow).toBeInTheDocument();
  });

  test("should collapse on caret select", async () => {
    const caret = document.querySelector(".caret");
    const workflowFormFields = document.querySelector(".workflow-form-fields");
    expect(caret).toBeInTheDocument();
    expect(workflowFormFields).toBeInTheDocument();

    if (caret != null && workflowFormFields != null) {
      // click on collapse caret
      // expect form fields to be hidden
      userEvent.click(caret);
      let css = window.getComputedStyle(workflowFormFields);
      expect(css.display).toBe("none");

      // click on collapse caret again
      // expect form fields to be visible
      userEvent.click(caret);
      css = window.getComputedStyle(workflowFormFields);
      expect(css.display).toBe("block");
    } else {
      fail("broken or missing components");
    }
  });

  test("should send fields to API on submit", () => {
    // text entry fields
    const fields = ["name", "repository", "host"];
    for (const i of fields) {
      const field = screen.getByPlaceholderText(
        i[0].toUpperCase() + i.substring(1)
      );
      expect(field).toBeInTheDocument();
      if (field != null) {
        userEvent.type(field, i);
      } else fail(`missing or broken field ${i}`);
    }

    // stack field dropdown
    const dropdownField = document.querySelector(".workflow-form-fields .dropdown")
    if (dropdownField != null) {
      userEvent.click(dropdownField)
    } else fail("stack field dropdown missing or broken")
    const dropdownOption = document.querySelectorAll(".workflow-form-fields .menu.transition .item")
    if (dropdownOption != null) {
      userEvent.click(dropdownOption[0])
    }

    // click submit button
    // should call api request with test payload
    const submitButton = document.querySelector("#submit-button");
    if (submitButton != null) {
      userEvent.click(submitButton);
      expect(newApplication).toBeCalledWith({
        name: "name",
        repository: "repository",
        host: "host",
        stack: "gke_dev"
      })
    } else fail("Submit button is missing or broken");
  });
});
