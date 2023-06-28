import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Image, Segment } from "semantic-ui-react";

// icons
import logo from "../assets/trustacks.svg";
import { ReactComponent as ApplicationsIcon } from "../assets/categories.svg";
import { ReactComponent as StacksIcon } from "../assets/stacked-files.svg";

import "./Header.css";
import ToolchainSubHeader from "./ToolchainSubHeader";
import { BreadcrumbSubHeader } from "./BreadcumbSubHeader";

const TrustacksHeader = ({}: { children?: React.ReactNode }) => {
  const { pathname } = useLocation();

  return (
    <Segment.Group className="trustacks-header">
      <Segment>
        <Menu secondary>
          <Link to="/">
            <Menu.Item>
              <Image style={{ width: "130px" }} src={logo} />
            </Menu.Item>
          </Link>
          <Link to="/stacks">
            <Menu.Item link className="header-link">
              <StacksIcon className="header-button-icon grey-icon" />
              <span>Stacks</span>
            </Menu.Item>
          </Link>
          <Link to="/applications">
            <Menu.Item link className="header-link">
              <ApplicationsIcon className="header-button-icon grey-icon" />
              <span>Applications</span>
            </Menu.Item>
          </Link>
        </Menu>
      </Segment>
      <Segment textAlign="left" className="sub-header">
        {(() => {
          switch (pathname) {
            case "/":
              return <ToolchainSubHeader />;
            default:
              return <BreadcrumbSubHeader />;
          }
        })()}
      </Segment>
    </Segment.Group>
  );
};

export default TrustacksHeader;
