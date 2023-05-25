import React from "react";
import { Menu, Image, Icon, Segment } from "semantic-ui-react";
import ToolchainSubHeader from "./ToolchainSubHeader";

import logo from "../assets/trustacks.svg";
import { ReactComponent as ApplicationsIcon } from "../assets/applications.svg";
import settings from "../assets/settings.svg";
import { useToolchainState } from "../hooks/toolchainState";

import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import { BreadcrumbSubHeader } from "./BreadcumbSubHeader";

function TrustacksHeader(): JSX.Element {
  const { toolchainState } = useToolchainState();
  const { pathname } = useLocation();

  return (
    <Segment.Group className="trustacks-header">
      <Segment>
        <Menu secondary>
          <Link to="/">
            <Menu.Item>
              <Image style={{width: "130px"}} src={logo} />
            </Menu.Item>
          </Link>
          <Link to="/applications">
            <Menu.Item link className="header-link">
              <ApplicationsIcon className="header-button-icon" />
              <span>Applications</span>
            </Menu.Item>
          </Link>
          {/* settings button, currently not used */}
          {/* <Menu.Item link className="header-link">
            <Link to="/settings">
              <Icon>
                <Image src={settings} />
              </Icon>
              Settings
            </Link>
          </Menu.Item> */}
          {/* user controls, currently not used */}
          {/* <Menu.Menu className="header-user-controls" position="right">
            <Menu.Item className="header-user-tab">Joe Schmoe</Menu.Item>
            <Menu.Item className="header-user-logout">
              <Icon name="log out" />
            </Menu.Item>
          </Menu.Menu> */}
        </Menu>
      </Segment>
      {toolchainState && (
        <Segment textAlign="left" className="sub-header">
          {pathname == "/" ? (
            <ToolchainSubHeader appStatus={toolchainState} />
          ) : (
            <BreadcrumbSubHeader />
          )}
        </Segment>
      )}
    </Segment.Group>
  );
}

export default TrustacksHeader;
