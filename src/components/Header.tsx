import React from "react";
import {
  Menu,
  Image,
  Icon,
  Segment,
  SemanticICONS,
} from "semantic-ui-react";
import ToolchainSubHeader from "./ToolchainSubHeader";

import logo from "../assets/trustacks.svg";
import applications from "../assets/applications.svg";
import settings from "../assets/settings.svg";
import { useAppStatus } from "../hooks/appStatus";

import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import { BreadcrumbSubHeader } from "./BreadcumbSubHeader";


function TrustacksHeader(): JSX.Element {
  const { appStatus } = useAppStatus();
  const { pathname } = useLocation();

  return (
    <Segment.Group className="trustacks-header">
      <Segment>
        <Menu secondary>
          <Link to="/">
            <Menu.Item>
              <Image size="small" src={logo} />
            </Menu.Item>
          </Link>
          <Menu.Item link className="header-link">
            <Link to="/applications">
              <Icon>
                <Image src={applications} />
              </Icon>
              Applications
            </Link>
          </Menu.Item>
          <Menu.Item link className="header-link">
            <Link to="/settings">
              <Icon>
                <Image src={settings} />
              </Icon>
              Settings
            </Link>
          </Menu.Item>
          <Menu.Menu className="header-user-controls" position="right">
            {/* placeholder rn */}
            <Menu.Item className="header-user-tab">Joe Schmoe</Menu.Item>
            <Menu.Item className="header-user-logout">
              <Icon name="log out" />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Segment>
      {appStatus && (
        <Segment textAlign="left" className="sub-header">
          {pathname == "/" ? (
            <ToolchainSubHeader appStatus={appStatus} />
          ) : (
            <BreadcrumbSubHeader />
          )}
        </Segment>
      )}
    </Segment.Group>
  );
}

export default TrustacksHeader;
