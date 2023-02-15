import React from "react";
import {
  Header,
  Menu,
  Image,
  Icon,
  Segment,
  SemanticICONS,
} from "semantic-ui-react";

import logo from "../assets/trustacks.svg";
import applications from "../assets/applications.svg";
import settings from "../assets/settings.svg";
import { useAppStatus } from "../hooks/appStatus";

import "./Header.css";
import { Link } from "react-router-dom";

const statusIcons: { [key: string]: SemanticICONS } = {
  healthy: "check circle",
};

function TrustacksHeader(): JSX.Element {
  const { appStatus } = useAppStatus();

  return (
    <Segment.Group className="trustacks-header">
      <Segment>
        <Menu secondary>
          <Link to="/">
            <Menu.Item>
              <Image size="small" src={logo} />
            </Menu.Item>
          </Link>
          <Menu.Item>
            <Icon>
              <Image src={applications} />
            </Icon>
            Applications
          </Menu.Item>
          <Menu.Item>
            <Icon>
              <Image src={settings} />
            </Icon>
            Settings
          </Menu.Item>
        </Menu>
      </Segment>
      {appStatus && appStatus.status && (
        <Segment textAlign="left" padded>
          <Header as="h4">
            <Icon
              name={statusIcons[appStatus.status]}
              color={"green"}
              size="large"
            />
            {appStatus.status[0].toUpperCase() + appStatus.status.substring(1)}
          </Header>
        </Segment>
      )}
      {/* </> */}
    </Segment.Group>
  );
}

export default TrustacksHeader;
