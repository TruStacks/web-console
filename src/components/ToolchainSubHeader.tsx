import React from "react";
import { Header, Icon, SemanticICONS } from "semantic-ui-react";

import {AppStatus} from "../hooks/appStatus"

const statusIcons: { [key: string]: SemanticICONS } = {
  healthy: "check circle",
};

function ToolchainSubHeader(props: {appStatus: AppStatus}) {
  const {appStatus} = props
  const {status} = appStatus
  return (
    <Header as="h4" className="toolchain-status">
      <Icon
        name={statusIcons[status || 0]}
        color={"green"}
        size="large"
      />
      {status ? status[0].toUpperCase() + status.substring(1) : status}
    </Header>
  );
}

export default ToolchainSubHeader
