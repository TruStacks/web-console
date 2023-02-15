import React, { useEffect, useState } from "react";
import {
  Container,
  Segment,
  SemanticICONS,
  SemanticCOLORS,
  Icon,
  Header,
  Popup,
  Loader,
  Grid,
} from "semantic-ui-react";
import { useAppStatus } from "../hooks/appStatus";
import apiRequest from "../modules/apiRequests";

type Component = { name: string; status: string };

// Component icon dictionary
const componentIcons: { [key: string]: SemanticICONS } = {
  reverted: "redo",
};

// Component icon colors dictionary
const componentIconColors: { [key: string]: SemanticCOLORS } = {
  reverted: "purple",
};

const ComponentSegment = ({ name, status }: Component) => {
  return (
    <Segment padded>
      <Popup
        trigger={
          <Icon
            name={componentIcons[status]}
            color={componentIconColors[status]}
          />
        }
        content={status[0].toUpperCase() + status.substring(1)}
        position="bottom center"
        mouseEnterDelay={500}
        offset={[0, 5]}
      />
      {name[0].toUpperCase() + name.substring(1)}
    </Segment>
  );
};

function Home(): JSX.Element {
  const { appStatus, setAppStatus } = useAppStatus();
  const [loading, setLoading] = useState(true);
  const [coreComponents, setCoreComponents] = useState<Component[]>();
  const [supplementalComponents, setSupplementalComponents] = useState<
    Component[]
  >();

  useEffect(() => {
    (async function() {
      const res = await apiRequest();
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
        const n: Component = { ...appStatus.components[i], name: i as string };
        switch (appStatus.components[i].kind) {
          case "core":
            newCore = [...newCore, n];
            break;
          case "supplemental":
            newSupp = [...newSupp, n];
            break;
        }
        setCoreComponents(newCore);
        setSupplementalComponents(newSupp);
      });
    }
  }, [appStatus]);

  return (
    <>
      {loading && (
        <Grid style={{ height: "20vh" }} verticalAlign="middle">
          <Grid.Column>
            <Loader inline="centered" active size="large" />
          </Grid.Column>
        </Grid>
      )}
      {!loading && (
        <Container textAlign="left">
          {coreComponents && coreComponents.length > 0 && (
            <Segment.Group>
              <Segment padded>
                <Header as="h4">
                  <Icon name="share alternate" color="teal" />
                  Core Components
                </Header>
              </Segment>
              {coreComponents.map((i) => {
                const { name, status } = i;
                return (
                  <ComponentSegment key={name} name={name} status={status} />
                );
              })}
            </Segment.Group>
          )}
          {supplementalComponents && supplementalComponents.length > 0 && (
            <Segment.Group>
              <Segment>Core Components</Segment>
              {supplementalComponents.map((i) => {
                const { name, status } = i;
                return (
                  <ComponentSegment key={name} name={name} status={status} />
                );
              })}
            </Segment.Group>
          )}
        </Container>
      )}
    </>
  );
}

export default Home;
