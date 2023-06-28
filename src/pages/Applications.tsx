import React, { useEffect, useState } from "react";
import { setDocumentTitle } from "../hooks/documentTitle";

import { Button, Icon, Image, Progress, Segment } from "semantic-ui-react";
import { getApplications } from "../modules/apiRequests";

// import editIcon from "../assets/edit.svg";
import exportIcon from "../assets/export.svg";
import { ReactComponent as ReadyStockIcon } from "../assets/ready-stock.svg";
import { ReactComponent as ProductionIcon } from "../assets/production.svg";
import "./Applications.css";

type ApplicationSegmentProps = {
  name: string;
  workflow: string;
  provider: string;
  activity: {
    createdAt: string;
    type: string;
    url: string;
    action: string;
    progress: number;
  };
};

const statusColor = (status: string) => {
  switch (status) {
    case "release":
      return "#21CF71";
    case "build":
      return "#F1BF85";
    case "failed":
      return "#E85E5E";
    default:
      return "#DDDDDD";
  }
};

const exNewRes = {
  jsonrpc: "2.0",
  result: [
    {
      name: "trustacks",
      provider: "native",
      workflow: "go-goreleaser",
      activity: {
        createdAt: "2023-06-22T20:11:27.8012419Z",
        type: "build",
        url:
          "https://grafana.dev.tc.trustacks.io:443/explore?left=%7B%22datasource%22%3A%22loki-trustacks%22%2C%22queries%22%3A%5B%7B%22datasource%22%3A%7B%22type%22%3A%22loki%22%2C%22uid%22%3A%22loki-trustacks%22%7D%2C%22editorMode%22%3A%22builder%22%2C%22expr%22%3A%22%7Bproject%3D%5C%22trustacks%5C%22%7D+%7C%3D+%60%60%22%2C%22queryType%22%3A%22range%22%2C%22refId%22%3A%22A%22%7D%5D%2C%22range%22%3A%7B%22from%22%3A%221687464687800%22%2C%22to%22%3A%22now%22%7D%7D&orgId=1",
        action: "lint",
        progress: 28,
      },
    },
    {
      name: "web-console",
      provider: "gke_dev",
      workflow: "create-react-app",
      activity: {
        createdAt: "2023-06-22T20:11:27.8012419Z",
        type: "release",
        url:
          "https://grafana.dev.tc.trustacks.io:443/explore?left=%7B%22datasource%22%3A%22loki-trustacks%22%2C%22queries%22%3A%5B%7B%22datasource%22%3A%7B%22type%22%3A%22loki%22%2C%22uid%22%3A%22loki-trustacks%22%7D%2C%22editorMode%22%3A%22builder%22%2C%22expr%22%3A%22%7Bproject%3D%5C%22trustacks%5C%22%7D+%7C%3D+%60%60%22%2C%22queryType%22%3A%22range%22%2C%22refId%22%3A%22A%22%7D%5D%2C%22range%22%3A%7B%22from%22%3A%221687464687800%22%2C%22to%22%3A%22now%22%7D%7D&orgId=1",
        action: "lint",
        progress: 100,
      },
    },
  ],
  id: "1",
};

function ApplicationRow(props: ApplicationSegmentProps) {
  const { name, workflow, activity } = props;
  if (activity == null) return <></> // quick fix for api problem
  const { progress, action, type } = activity;
  const disabled = type !== "release";

  function updateApplications () {

  }

  return (
    <Segment.Group style={{ marginBottom: "20px" }} className="application">
      <div className="app-row">
        <div className="app-row-left-col">
          <div className="app-row-left-col-name">
            <Icon name="circle" style={{ color: statusColor(type), marginLeft: "4px" }} />
            <b style={{ color: "#777" }}>{name}</b>
          </div>
          <div className="app-row-left-col-buttons">
            <Icon link name="download" style={{ color: "#aaa" }} />
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
            {type === "failed" ? (
              <Icon
                name="warning sign"
                style={{ color: statusColor("failed") }}
              />
            ) : (
              <b style={{ color: "#aaa" }}>{`${progress}%`}</b>
            )}
          </span>
          {progress > 0 ? (
            <Progress
              className="app-progress"
              percent={progress}
              error={type === "failed"}
              color={
                type === "failed"
                  ? "red"
                  : progress > 0 || progress < 100
                  ? "purple"
                  : "grey"
              }
              active={progress < 100 && progress !== 0 && type !== "failed"}
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
            icon
            disabled={type !== "failed" && type !== "release"}
            style={{
              display: "flex",
              alignContent: "center",
              padding: "5px",
              marginRight: "10px",
              backgroundColor:
                type === "failed" || !(progress < 100 && progress > 0)
                  ? "#9B7FFF"
                  : "lightgrey",
              color: "white",
              borderRadius: "5px",
            }}
          >
            <ProductionIcon
              className="white-icon"
              style={{ height: "20px", width: "20px" }}
            />
          </Button>
          <Button
            className="deliver-button"
            color={disabled ? "grey" : "green"}
            disabled={disabled}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "30px",
              padding: "5px",
              borderRadius: "5px",
              fontSize: "13px",
            }}
          >
            <ReadyStockIcon
              className="white-icon"
              style={{
                width: "20px",
                height: "20px",
                marginRight: "5px",
              }}
            />
            Deliver
          </Button>
        </div>
      </div>
    </Segment.Group>
  );
}

export default function Applications() {
  const [applications, setApplications] = useState<ApplicationSegmentProps[]>(
    exNewRes.result
  );

  useEffect(() => {
    setDocumentTitle("Applications");
    (async () => {
      const res = await getApplications();
      if (res.result) setApplications([...applications, ...res.result]);
    })();
  }, []);

  return (
    <>
      {applications.map((i,j) => {
        const { name, workflow, activity, provider } = i;
        return (
          <ApplicationRow
            key={name + j}
            provider={provider}
            name={name}
            workflow={workflow}
            activity={activity}
          />
        );
      })}
    </>
  );
}

