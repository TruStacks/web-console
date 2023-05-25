import React from "react";
import { Header, SemanticICONS } from "semantic-ui-react";
import { ToolchainState } from "../hooks/toolchainState";

// Status icons
import { ReactComponent as LoadingIcon } from "../assets/loading.svg";
import { ReactComponent as UpdateArrowsIcon } from "../assets/update-arrows.svg";
import { ReactComponent as CardiogramIcon } from "../assets/cardiogram.svg";
import { ReactComponent as WarningIcon } from "../assets/warning.svg";

import "./ToolchainSubHeader.css";


function ToolchainSubHeader(props: { appStatus: ToolchainState }) {
  const { appStatus } = props;
  const { status } = appStatus;

  if (status == "") {
    return <></>
  }
  return (
    <Header as="h4" className="toolchain-status">
      {(() => {
        switch (status) {
          // Initial toolchain page load
          case "initializing":
            return <LoadingIcon className="toolchain-status-icon purple rotate" />;
          // Good status
          case "healthy":
            return <CardiogramIcon className="toolchain-status-icon green" />;
          // Pending statuses
          case "installing":
          case "upgrading":
            return <UpdateArrowsIcon className="toolchain-status-icon purple spin" />;
          case "asdf":
            return;
          // Error statuses
          case "critical":
            return <WarningIcon className="toolchain-status-icon red" />;
        }
      })()}
      {status ? status[0].toUpperCase() + status.substring(1) : status}
    </Header>
  );
}

export default ToolchainSubHeader;
