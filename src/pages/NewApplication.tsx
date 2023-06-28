import React, { useState } from "react";
import {
  Button,
  DropdownProps,
  Form,
  Icon,
  InputOnChangeData,
  Segment,
} from "semantic-ui-react";
import { newApplication as newApplicationReq } from "../modules/apiRequests";

import "./NewApplication.css";

type newApplicationForm = {
  name: string;
  repository: string;
  host: string;
  stack: string;
};

type formFields = keyof newApplicationForm;

const stacks = [{ key: "gke", text: "GKE Dev", value: "gke_dev" }];

export default function NewApplication() {
  const [newApplicationData, setNewApplicationData] = useState<
    newApplicationForm
  >({ name: "", repository: "", host: "", stack: "" });
  const [collapsed, setCollapsed] = useState(false);

  const handleChange = (
    data: InputOnChangeData | DropdownProps,
    field: formFields
  ) => {
    let { value } = data;
    if (value) {
      value = value.toString();
      let newFormData = { ...newApplicationData };
      newFormData[field] = value;
      setNewApplicationData(newFormData);
    }
  };

  return (
    <Segment.Group className="workflow-form">
      <Segment
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <h4 className="workflow-name">Workflow A</h4>
          <span className="workflow-about">
            By <span style={{ color: "#9B7FFF" }}>TruStacks</span>
          </span>
        </div>
        <Icon
          name={collapsed ? "caret right" : "caret down"}
          style={{ color: "#aaa", cursor: "pointer" }}
          onClick={() => setCollapsed(!collapsed)}
        />
      </Segment>
      <Segment
        className="workflow-form-fields"
        style={{ display: collapsed ? "none" : "block" }}
      >
        <Form>
          <Form.Input
            fluid
            width={6}
            label="Name"
            type="text"
            placeholder="Name"
            onChange={(_, d) => handleChange(d, "name")}
          />
          <Form.Input
            fluid
            width={6}
            label="Repository"
            type="text"
            placeholder="Repository"
            onChange={(_, d) => handleChange(d, "repository")}
          />
          <Form.Input
            fluid
            width={6}
            label="Host"
            type="text"
            placeholder="Host"
            onChange={(_, d) => handleChange(d, "host")}
          />
          <Form.Select
            fluid
            width={3}
            label="Stack"
            type="text"
            placeholder="Stack"
            options={stacks}
            onChange={(_, d) => handleChange(d, "stack")}
          />
        </Form>
        <Button
          id="submit-button"
          disabled={Object.values(newApplicationData).some((i) => i === "")}
          onClick={async () => {
            const res = await newApplicationReq(newApplicationData);
            console.log(res);
          }}
          style={{
            color: "white",
            backgroundColor: "#44ac97",
            paddingTop: "8px",
            paddingBottom: "8px",
          }}
        >
          Submit
        </Button>
      </Segment>
    </Segment.Group>
  );
}
