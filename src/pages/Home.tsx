import React, { useEffect, useState } from "react";
import { Segment, Icon, Header, Popup, Loader, Grid } from "semantic-ui-react";

import { useAppStatus } from "../hooks/appStatus";
import { getToolchainInfo } from "../modules/apiRequests";

import "./Home.css";
import { setDocumentTitle } from "../hooks/documentTitle";

type Component = { name: string; status: string };

const ComponentSegment = ({ name, status }: Component) => {
  const NameText = () => (
    <span className="component-name">
      {name[0].toUpperCase() + name.substring(1)}
    </span>
  );
  const statusText = status[0].toUpperCase() + status.substring(1);
  return (
    <Segment>
      {status ? (
        // popup with status on name hover
        <Popup
          trigger={
            <span>
              <NameText />
            </span>
          }
          content={statusText}
          position="bottom center"
          mouseEnterDelay={500}
          offset={[0, 5]}
        />
      ) : (
        <NameText />
      )}
    </Segment>
  );
};

function Home(): JSX.Element {
  const { appStatus, setAppStatus } = useAppStatus();
  const [loading, setLoading] = useState(true);
  const [coreComponents, setCoreComponents] = useState<Component[]>();
  const [extensionComponents, setExtensionComponents] = useState<Component[]>();
  
  useEffect(() => {
    (async function () {
      setDocumentTitle()
      const res = await getToolchainInfo();
      if (res.result) {
        setAppStatus(res.result);
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (appStatus && appStatus.components) {
      let newCore: Component[] = [];
      let newSupp: Component[] = [];
      Object.keys(appStatus.components).map((i) => {
        const { name } = appStatus.components[i];
        const n: Component = { ...appStatus.components[i], name };
        switch (appStatus.components[i].kind) {
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
  }, [appStatus]);

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
        <div style={{ padding: "30px" }}>
          <Segment.Group className="components">
            <Segment padded className="core-components">
              <Header as="h4">
                <Icon name="share alternate" color="teal" />
                Core Components
              </Header>
            </Segment>
            {coreComponents && coreComponents.length > 0 ? (
              coreComponents.map((i) => {
                const { name, status } = i;
                return (
                  <ComponentSegment key={name} name={name} status={status} />
                );
              })
            ) : (
              <Segment padded>No components installed</Segment>
            )}
          </Segment.Group>
          <Segment.Group className="components">
            <Segment padded className="extension-components">
              <Header as="h4">
                <Icon name="share alternate" color="teal" />
                Extension Components
              </Header>
            </Segment>
            {extensionComponents && extensionComponents.length > 0 ? (
              extensionComponents.map((i) => {
                const { name, status } = i;
                return (
                  <ComponentSegment key={name} name={name} status={status} />
                );
              })
            ) : (
              <Segment padded>No components installed</Segment>
            )}
          </Segment.Group>
          {/* // </Container> */}
        </div>
      )}
    </>
  );
}

export default Home;
