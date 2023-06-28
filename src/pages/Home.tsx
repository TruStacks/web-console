import React, { useEffect, useState } from "react";
import { Segment, Icon, Header, Popup, Loader, Grid } from "semantic-ui-react";

import { useToolchainState } from "../hooks/toolchainState";
import { setDocumentTitle } from "../hooks/documentTitle";

import { ReactComponent as NetworkIcon } from "../assets/network.svg";
import "./Home.css";

type Component = { name: string; status: string };

// Component status dot colors
const componentStatusColor = (status: string) => {
  const componentStatusColors = {
    red: "#E85E5E",
    yellow: "#F1BF85",
    green: "#21CF71",
    grey: "#AAAAAA",
  };
  switch (status) {
    // good status color
    case "installed":
    case "upgraded":
    case "reverted":
      return componentStatusColors.green;
    // in progress status color
    case "pending":
      return componentStatusColors.yellow;
    // bad staus color
    case "failing":
    case "unhealthy":
      return componentStatusColors.red;
    // unknown status color
    default:
      return componentStatusColors.grey;
  }
};

const ComponentSegment = ({ name, status }: Component) => {
  const color = componentStatusColor(status)
  const circleClass = `circle component-status-dot${status === "pending" ? " fade-in-out" : ""}`
  const NameText = () => (
    <span className="component-name">
      <Popup
        trigger={
          <Icon
            className={circleClass}
            style={{ color }}
          />
        }
        content={statusText}
        position="bottom left"
        mouseEnterDelay={500}
        offset={[-12, 5]}
      />
      {name[0].toUpperCase() + name.substring(1)}
    </span>
  );

  const statusText = status[0].toUpperCase() + status.substring(1);
  return (
    <Segment>
      {/* {status ? (
        // popup with status on name hover
        <NameText />
      ) : (
        <NameText />
      )} */}
      <NameText />
    </Segment>
  );
};

function Home(): JSX.Element {
  const { toolchainState } = useToolchainState();
  const [loading, setLoading] = useState(true);
  const [coreComponents, setCoreComponents] = useState<Component[]>();
  const [extensionComponents, setExtensionComponents] = useState<Component[]>();

  useEffect(() => {
    setDocumentTitle("");
  }, []);

  useEffect(() => {
    // disable spinner if data is fetched
    if (toolchainState && toolchainState.status !== "loading") {
      setLoading(false);
    } else {
      setLoading(true);
    }

    if (toolchainState && toolchainState.components) {
      let newCore: Component[] = [];
      let newSupp: Component[] = [];
      Object.keys(toolchainState.components).map((i) => {
        const { name } = toolchainState.components[i];
        const n: Component = { ...toolchainState.components[i], name };
        switch (toolchainState.components[i].kind) {
          case "core":
            newCore = [...newCore, n];
            break;
          case "extension":
            newSupp = [...newSupp, n];
            break;
        }
        setCoreComponents(newCore);
        setExtensionComponents(newSupp);
      });
    }
  }, [toolchainState]);

  return (
    <>
      {/* Loading spinner while fetching data */}
      {loading && (
        <Grid style={{ height: "20vh" }} verticalAlign="middle">
          <Grid.Column>
            <Loader inline="centered" active size="large" />
          </Grid.Column>
        </Grid>
      )}
      {/* Once data is fetched, display components */}
      {!loading && (
        <>
          <Segment.Group className="components">
            <Segment padded className="core-components">
              <Header as="h4">
                <NetworkIcon className="components-icon green-icon" />
                Core Components
              </Header>
            </Segment>
            {coreComponents && coreComponents.length > 0 ? (
              coreComponents.map((i, j) => {
                const { name, status } = i;
                return (
                  <ComponentSegment
                    key={name + j}
                    name={name}
                    status={status}
                  />
                );
              })
            ) : (
              <Segment padded>No components installed</Segment>
            )}
          </Segment.Group>
          <Segment.Group className="components">
            <Segment padded className="extension-components">
              <Header as="h4">
                <NetworkIcon className="components-icon green-icon" />
                Extension Components
              </Header>
            </Segment>
            {extensionComponents && extensionComponents.length > 0 ? (
              extensionComponents.map((i, j) => {
                const { name, status } = i;
                return (
                  <ComponentSegment
                    key={name + j}
                    name={name}
                    status={status}
                  />
                );
              })
            ) : (
              <Segment padded>No components installed</Segment>
            )}
          </Segment.Group>
          {/* // </Container> */}
        </>
      )}
    </>
  );
}

export default Home;
