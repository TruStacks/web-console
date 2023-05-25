import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {setDocumentTitle} from "../hooks/documentTitle"

import {
  Button,
  Icon,
  Image,
  Progress,
  Segment,
} from "semantic-ui-react";

// import editIcon from "../assets/edit.svg";
import exportIcon from "../assets/export.svg";
import productReleaseIcon from "../assets/product-release.svg";
import "./Applications.css";

type ApplicationSegmentProps = {
  name: string;
  status: string;
  buildInfo: {
    logs: string;
    actionName: string;
    actionIndex: number;
    actionCount: number;
  };
};

const statusColor = (status: string) => {
  switch (status) {
    case "healthy":
      return "#21CF71";
    case "building":
      return "#F1BF85";
    case "failed":
      return "red";
    default:
      return "#DDDDDD";
  }
};

const exRes = {
  jsonrpc: "2.0",
  result: [
    {
      name: "react-tutorial",
      status: "building",
      buildInfo: {
        logs: "",
        actionName: "Installing Dependencies",
        actionIndex: 6,
        actionCount: 7,
      },
    },
    {
      name: "fastapi",
      status: "building",
      buildInfo: {
        logs: "",
        actionName: "CI/CD",
        actionIndex: 4,
        actionCount: 10,
      },
    },
    {
      name: "golang-mux",
      status: "failed",
      buildInfo: { logs: "", actionName: "", actionIndex: 7, actionCount: 10 },
    },
    {
      name: "angular-app",
      status: "healthy",
      buildInfo: { logs: "", actionName: "", actionIndex: 10, actionCount: 10 },
    },
  ],
  id: 1,
};

function ApplicationRow(props: ApplicationSegmentProps) {
  const { name, status, buildInfo } = props;
  const { actionIndex, actionCount } = buildInfo;
  const progressPercent =
    Number(actionCount) === 0
      ? 0
      : Math.floor((Number(actionIndex) * 100) / Number(actionCount));
  const disabled = status === "failed" || progressPercent != 100;

  useEffect(() => {
    setDocumentTitle("Applications")
  })

  return (
    <Segment.Group style={{ marginBottom: "20px" }}>
      <div className="app-row">
        <div className="app-row-left-col">
          <div className="app-row-left-col-name">
            <Icon name="circle" style={{ color: statusColor(status) }} />
            <b style={{ color: "#777" }}>{name}</b>
          </div>
          <div className="app-row-left-col-buttons">
            <Icon link name="edit" style={{ color: "#aaa" }} />
            <Icon link name="trash" style={{ color: "#aaa" }} />
          </div>
        </div>
        <div className="app-row-right-col">
          <span
            style={{
              width: "40px",
              textAlign: "center",
              color: "#AAA",
              marginRight: "10px",
            }}
          >
            {status === "failed" ? (
              <Icon name="warning sign" color="red" />
            ) : (
              <b style={{ color: "#aaa" }}>{`${progressPercent}%`}</b>
            )}
          </span>
          {progressPercent > 0 ? (
            <Progress
              className="app-progress"
              percent={progressPercent}
              error={status === "failed"}
              color={
                progressPercent > 0 || progressPercent < 100 ? "purple" : "grey"
              }
              active={
                progressPercent < 100 &&
                progressPercent !== 0 &&
                status !== "failed"
              }
              size="small"
              style={{ width: "100px" }}
            />
          ) : (
            <div
              style={{
                width: "100px",
                height: "13px",
                backgroundColor: "#f3f3f3",
                borderRadius: "4px",
              }}
            />
          )}
          <a className="external-icon grey-svg">
            <Image src={exportIcon} style={{ width: "16px" }} />
          </a>
          <Button
            compact
            icon="cog"
            disabled={
              status !== "failed" &&
              progressPercent < 100 &&
              progressPercent > 0
            }
            style={{
              margin: "0 10px",
              backgroundColor:
                status === "failed" ||
                !(progressPercent < 100 && progressPercent > 0)
                  ? "#9B7FFF"
                  : "lightgrey",
              color: "white",
            }}
          />
          <Button
            className="deliver-button"
            compact
            color={disabled ? "grey" : "green"}
            icon="cube"
            disabled={disabled}
            style={{ display: "flex", flexDirection: "row" }}
          >
            {/* <Icon name="cube" /> */}
            <span>
              <Image
                src={productReleaseIcon}
                className="white-svg"
                style={{ width: "20px", margimnkeRight: "10px" }}
              />
            </span>
              Deliver
          </Button>
        </div>
      </div>
    </Segment.Group>
  );
}

function Applications() {
  const [applications, setApplications] = useState<ApplicationSegmentProps[]>(
    exRes.result
  );

  // currently the api is not working for GetApplications
  // disabled getApplications fetch for now

  // useEffect(() => {
  //   (async () => {
  //     const res = await getApplications();
  //     if (res.result) {
  //       setApplications([...applications, ...res.result]);
  //     }
  //   })();
  // }, []);

  return (
    <div style={{ margin: "30px" }}>
      {applications.map((i) => {
        const { name, status, buildInfo } = i;
        return (
          <ApplicationRow
            key={name}
            name={name}
            status={status}
            buildInfo={buildInfo}
          />
        );
      })}
    </div>
  );
}

export default Applications;
