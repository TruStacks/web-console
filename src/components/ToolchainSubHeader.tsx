import React from "react";
import { Header, SemanticICONS } from "semantic-ui-react";
import { useToolchainState } from "../hooks/toolchainState";

// Status icons
import { ReactComponent as LoadingIcon } from "../assets/loading.svg";
import { ReactComponent as UpdateArrowsIcon } from "../assets/update-arrows.svg";
import { ReactComponent as CardiogramIcon } from "../assets/cardiogram.svg";
import { ReactComponent as WarningIcon } from "../assets/warning.svg";

import "./ToolchainSubHeader.css";

function ToolchainSubHeader() {
  const { toolchainState } = useToolchainState();
  if (toolchainState != null) {
    const { status } = toolchainState;

    return (
      <Header as="h4" className="toolchain-status">
        {(() => {
          switch (status) {
            // Initial toolchain page load
            case "loading":
              return (
                <LoadingIcon className="toolchain-status-icon purple-icon rotate" />
              );
            // Good status
            case "healthy":
              return <CardiogramIcon className="toolchain-status-icon green-icon" />;
            // Pending statuses
            case "installing":
            case "upgrading":
              return (
                <UpdateArrowsIcon className="toolchain-status-icon purple-icon spin" />
              );
            case "reverting":
              return (
                <UpdateArrowsIcon className="toolchain-status-icon purple-icon spin-reversed" />
              )
            // Error statuses
            case "critical":
              return <WarningIcon className="toolchain-status-icon red-icon" />;
          }
        })()}
        {status ? status[0].toUpperCase() + status.substring(1) : status}
      </Header>
    );
  } else return <></>;
}

export default ToolchainSubHeader;
