import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, Button, Icon, Popup } from "semantic-ui-react";
import "./BreadcrumbSubHeader.css";

import { ReactComponent as AddIcon } from "../assets/add.svg";
import { useToolchainState } from "../hooks/toolchainState";

export function BreadcrumbSubHeader() {
  const { pathname } = document.location;
  const paths = pathname.match(/[^\/]+/g);

  const { toolchainState } = useToolchainState();
  const [copyPopupShow, setCopyPopupShow] = useState(false);

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Section>
          <Link to="/">
            <Button
              circular
              compact
              icon="home"
              style={{
                backgroundColor: "#9B7FFF",
                color: "white",
                marginLeft: "8px",
              }}
            />
          </Link>
        </Breadcrumb.Section>
        {paths &&
          paths.map((p, i) => {
            const linkPath = `/${paths.slice(0, i + 1).join("/")}`;
            return (
              <Link key={i} to={linkPath} className="breadcrumb-link">
                <Breadcrumb.Divider style={{ margin: "0 8px" }} />
                <Breadcrumb.Section>
                  {p[0].toUpperCase() + p.substring(1)}
                </Breadcrumb.Section>
              </Link>
            );
          })}
      </Breadcrumb>
      {pathname == "/applications" && (
        <div style={{ display: "flex" }}>
          <Popup
            basic
            size="mini"
            position="top center"
            content="Copied to clipboard!"
            open={copyPopupShow}
            trigger={
              <Button
                className="deploy-key-button green-button"
                style={{ padding: "8px 12px", marginRight: "16px" }}
                onClick={async () => {
                  if (toolchainState != null) {
                    navigator.clipboard.writeText(toolchainState.deployKey);
                    setCopyPopupShow(true)
                    setTimeout(() => setCopyPopupShow(false), 1000)
                  }
                }}
              >
                Deploy Key
                <Icon name="copy outline" style={{ marginLeft: "10px" }} />
              </Button>
            }
          />
          <Link to="/applications/new">
            <Button
              className="new-application-button"
              style={{ padding: "8px 12px" }}
            >
              <AddIcon
                className="white-icon"
                style={{
                  width: "16px",
                  height: "16px",
                  marginRight: "8px",
                }}
              />
              New Application
            </Button>
          </Link>
        </div>
      )}
    </>
  );
}
